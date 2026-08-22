import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import type { TerminalPresenter, TerminalRendererAdapter } from "@soksak/soksak-kit-plugin-terminal";
import { WebkitImeAddon } from "xterm-addon-webkit-ime";

import { createSerialTerminalWriter, routeXtermData } from "./input";
import { createRendererPayload, summarizeRendererSamples, type RendererBenchmarkMode } from "./rendererBenchmark";
import { injectStyles } from "./styles";
import { observeTerminalTheme, readTerminalTheme } from "./theme";

export interface XtermBenchmarkRequest { mode: RendererBenchmarkMode; bytes: number; repetitions: number }
export interface XtermPresenter extends TerminalPresenter {
  benchmark(request: XtermBenchmarkRequest): Promise<Record<string, unknown>>;
}

export function createXtermRendererAdapter(): TerminalRendererAdapter {
  return {
    delivery: "bytes", rendererId: "xterm", rendererProfile: "web",
    create: (container, _pane, send) => createXtermPresenter(container, send),
  };
}

export function createXtermPresenter(container: HTMLElement, send: (data: string) => void): XtermPresenter {
  container.dataset.node = "terminal-root";
  injectStyles();
  const themeRoot = container.ownerDocument.documentElement;
  const terminal = new Terminal({
    cursorBlink: true, convertEol: true, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 13, theme: readTerminalTheme(themeRoot),
  });
  const stopTheme = observeTerminalTheme(themeRoot, () => { terminal.options.theme = readTerminalTheme(themeRoot); });
  const fitAddon = new FitAddon(); terminal.loadAddon(fitAddon); terminal.open(container);
  if (terminal.element) {
    terminal.element.dataset.node = "terminal-screen"; terminal.element.setAttribute("role", "log");
    terminal.element.setAttribute("aria-live", "polite");
  }
  if (terminal.textarea) terminal.textarea.dataset.node = "terminal-input";
  const recovery = document.createElement("span");
  recovery.dataset.node = "terminal-restore-status"; recovery.hidden = true; container.append(recovery);
  container.dataset.terminalIme = "webkit";

  const write = createSerialTerminalWriter(async (data) => { send(data); });
  const ime = new WebkitImeAddon({ onData: (data) => { void write(data); }, onDebug: () => undefined });
  terminal.loadAddon(ime);
  const input = terminal.onData((data) => routeXtermData(ime, write, data));
  const parsed = new Set<() => void>();
  const notifyParsed = () => { for (const listener of parsed) listener(); };
  const output = createCoalescedXtermWriter(
    (bytes, complete) => terminal.write(bytes, complete),
    notifyParsed,
  );
  const waitForText = createTerminalTextWait(
    () => readScreen(terminal),
    (callback) => { parsed.add(callback); return { dispose: () => { parsed.delete(callback); } }; },
  );
  const fit = () => {
    if (container.isConnected && container.clientWidth > 0 && container.clientHeight > 0) fitAddon.fit();
  };
  fit();

  return {
    root: container, fit, size: () => ({ cols: terminal.cols, rows: terminal.rows }),
    applySnapshot: async (snapshot) => {
      if (typeof snapshot.paint !== "string") throw new Error("terminal snapshot has no paint");
      await output.writeAndWait(decodeBase64(snapshot.paint as string));
      terminal.refresh(0, Math.max(0, terminal.rows - 1));
    },
    writeOutput: output.write,
    read: (lines) => readScreen(terminal, lines),
    waitForText,
    focus: () => { terminal.focus(); return !!terminal.textarea && terminal.textarea.ownerDocument.activeElement === terminal.textarea; },
    prepareFocusTransfer: () => { ime.flushPending(); terminal.textarea?.blur(); },
    refresh: () => terminal.refresh(0, Math.max(0, terminal.rows - 1)),
    async benchmark(request) {
      const payload = createRendererPayload(request.mode, request.bytes);
      const samplesMs: number[] = [];
      const scratch = new Terminal({ cols: terminal.cols, rows: terminal.rows, scrollback: terminal.options.scrollback });
      try {
        for (let index = 0; index < request.repetitions; index += 1) {
          const started = performance.now();
          await new Promise<void>((resolve) => scratch.write(payload, () => { samplesMs.push(performance.now() - started); resolve(); }));
        }
      } finally { scratch.dispose(); }
      return {
        engine: "xterm", mode: request.mode, bytesPerSample: payload.byteLength,
        repetitions: request.repetitions, cols: terminal.cols, rows: terminal.rows,
        ...summarizeRendererSamples(samplesMs, payload.byteLength),
      };
    },
    dispose() {
      output.dispose(); parsed.clear(); stopTheme(); input.dispose(); ime.dispose(); terminal.dispose();
      delete container.dataset.terminalIme; container.replaceChildren();
    },
  };
}

export function createCoalescedXtermWriter(
  write: (bytes: Uint8Array, complete: () => void) => void,
  parsed: () => void,
): { write(bytes: Uint8Array): void; writeAndWait(bytes: Uint8Array): Promise<void>; dispose(): void } {
  let active = false;
  let disposed = false;
  let pending: Array<{ bytes: Uint8Array; waiter?: () => void }> = [];
  let activeWaiters: (() => void)[] = [];

  const submit = (bytes: Uint8Array, waiter?: () => void) => {
    if (disposed) { waiter?.(); return; }
    if (active) { pending.push({ bytes, waiter }); return; }
    active = true;
    if (waiter) activeWaiters.push(waiter);
    write(bytes, complete);
  };
  const complete = () => {
    parsed();
    const completed = activeWaiters.splice(0);
    completed.forEach((resolve) => resolve());
    if (disposed || pending.length === 0) { active = false; return; }
    const next = concatBytes(pending.map((item) => item.bytes));
    activeWaiters = pending.flatMap((item) => item.waiter ? [item.waiter] : []);
    pending = [];
    write(next, complete);
  };
  return {
    write: (bytes) => submit(bytes),
    writeAndWait: (bytes) => new Promise((resolve) => submit(bytes, resolve)),
    dispose() {
      disposed = true;
      const pendingWaiters = pending.flatMap((item) => item.waiter ? [item.waiter] : []);
      pending = [];
      [...activeWaiters.splice(0), ...pendingWaiters].forEach((resolve) => resolve());
    },
  };
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const joined = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.byteLength, 0));
  let offset = 0;
  for (const chunk of chunks) { joined.set(chunk, offset); offset += chunk.byteLength; }
  return joined;
}

export function createTerminalTextWait(
  read: () => string,
  onWriteParsed: (callback: () => void) => { dispose(): void },
): (contains: string, timeoutMs: number) => Promise<string> {
  return (contains, timeoutMs) => {
    const current = read();
    if (current.includes(contains)) return Promise.resolve(current);
    return new Promise((resolve, reject) => {
      const parsed = onWriteParsed(() => {
        const text = read();
        if (!text.includes(contains)) return;
        clearTimeout(timer); parsed.dispose(); resolve(text);
      });
      const timer = setTimeout(() => {
        parsed.dispose(); reject(new Error(`terminal text wait timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    });
  };
}

function decodeBase64(encoded: string): Uint8Array {
  const decoded = atob(encoded); return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
}

function readScreen(terminal: Terminal, lines?: number): string {
  const buffer = terminal.buffer.active; const last = buffer.baseY + terminal.rows;
  const first = lines && lines > 0 ? Math.max(0, last - lines) : 0; const read: string[] = [];
  for (let row = first; row < last; row += 1) read.push(buffer.getLine(row)?.translateToString(true) ?? "");
  return read.join("\n");
}

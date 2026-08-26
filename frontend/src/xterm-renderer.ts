import { FitAddon } from "@xterm/addon-fit";
import { Terminal, type ITheme } from "@xterm/xterm";
import {
  bindTerminalThemeSurface,
  observeTerminalTheme,
  readTerminalTheme,
  type TerminalPresenter,
  type TerminalRendererAdapter,
} from "@soksak/soksak-kit-plugin-terminal";
import {
  TERMINAL_ANSI_PALETTE,
  type TerminalPresentationTheme,
} from "@soksak/soksak-contract-plugin-terminal";
import { WebkitImeAddon } from "xterm-addon-webkit-ime";

import { createSerialTerminalWriter, routeXtermData } from "./input";
import { createRendererPayload, summarizeRendererSamples, type RendererBenchmarkMode } from "./rendererBenchmark";
import { injectStyles } from "./styles";

export interface XtermBenchmarkRequest { mode: RendererBenchmarkMode; bytes: number; repetitions: number }
export interface XtermPresenter extends TerminalPresenter {
  benchmark(request: XtermBenchmarkRequest): Promise<Record<string, unknown>>;
}

export function createXtermRendererAdapter(): TerminalRendererAdapter {
  return {
    delivery: "bytes", rendererId: "xterm", rendererProfile: "web",
    create: (container, _pane, send, options) => createXtermPresenter(container, send, options?.nodeSuffix ?? null),
  };
}

export function createXtermTheme(theme: TerminalPresentationTheme): ITheme {
  const [
    black, red, green, yellow, blue, magenta, cyan, white,
    brightBlack, brightRed, brightGreen, brightYellow,
    brightBlue, brightMagenta, brightCyan, brightWhite,
  ] = TERMINAL_ANSI_PALETTE;
  return {
    ...theme,
    black, red, green, yellow, blue, magenta, cyan, white,
    brightBlack, brightRed, brightGreen, brightYellow,
    brightBlue, brightMagenta, brightCyan, brightWhite,
    extendedAnsi: [...TERMINAL_ANSI_PALETTE.slice(16)],
  };
}

export function createXtermPresenter(
  container: HTMLElement,
  send: (data: string) => void,
  nodeSuffix: string | null = null,
): XtermPresenter {
  const nodeName = (base: string) => (nodeSuffix === null ? base : `${base}/${nodeSuffix}`);
  container.dataset.node = nodeName("terminal-root");
  injectStyles();
  const themeRoot = container.ownerDocument.documentElement;
  bindTerminalThemeSurface(container);
  const terminal = new Terminal({
    cursorBlink: true, convertEol: true, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 13, theme: createXtermTheme(readTerminalTheme(themeRoot)),
  });
  const stopTheme = observeTerminalTheme(themeRoot, () => {
    terminal.options.theme = createXtermTheme(readTerminalTheme(themeRoot));
  });
  const fitAddon = new FitAddon(); terminal.loadAddon(fitAddon); terminal.open(container);
  const screen = terminal.element;
  if (screen) {
    screen.dataset.node = nodeName("terminal-screen"); screen.setAttribute("role", "log");
    screen.setAttribute("aria-live", "polite");
    bindTerminalThemeSurface(screen);
  }
  if (terminal.textarea) terminal.textarea.dataset.node = nodeName("terminal-input");
  container.dataset.terminalIme = "webkit";

  const write = createSerialTerminalWriter(async (data) => { send(data); });
  const ime = new WebkitImeAddon({ onData: (data) => { void write(data); }, onDebug: () => undefined });
  terminal.loadAddon(ime);
  let terminalInputSequence = 0;
  const input = terminal.onData((data) => {
    terminalInputSequence += 1;
    routeXtermData(ime, write, data);
  });
  const keyFallback = (event: KeyboardEvent) => {
    const before = terminalInputSequence;
    queueMicrotask(() => {
      if (terminalInputSequence !== before || event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
      const sequences: Record<string, string> = {
        Enter: "\r", Backspace: "\x7f", Tab: "\t",
        ArrowUp: "\x1b[A", ArrowDown: "\x1b[B", ArrowRight: "\x1b[C", ArrowLeft: "\x1b[D",
      };
      const value = sequences[event.key] ?? (event.key.length === 1 ? event.key : "");
      if (value) void write(value);
    });
  };
  terminal.textarea?.addEventListener("keydown", keyFallback, true);
  const parsed = new Set<() => void>();
  const renderedListeners = new Set<(durationMs: number) => void>();
  const captureWindow = container.ownerDocument.defaultView;
  if (!captureWindow) throw new Error("terminal document has no display clock");
  const renderWork = createXtermRenderWorkMeasurement((callback) => {
    const frame = captureWindow.requestAnimationFrame(() => callback());
    return () => captureWindow.cancelAnimationFrame(frame);
  });
  let cursorVisible = true;
  const syncCursor = () => {
    if (!screen) return;
    const focused = terminal.textarea?.ownerDocument.activeElement === terminal.textarea;
    screen.dataset.cursorVisible = String(cursorVisible);
    screen.dataset.cursorActive = String(cursorVisible && focused);
    screen.dataset.cursorRow = String(terminal.buffer.active.cursorY);
    screen.dataset.cursorColumn = String(terminal.buffer.active.cursorX);
  };
  const cursorHidden = terminal.parser.registerCsiHandler({ prefix: "?", final: "l" }, (params) => {
    if (params.flat().includes(25)) cursorVisible = false;
    return false;
  });
  const cursorShown = terminal.parser.registerCsiHandler({ prefix: "?", final: "h" }, (params) => {
    if (params.flat().includes(25)) cursorVisible = true;
    return false;
  });
  const cursorMoved = terminal.onCursorMove(syncCursor);
  terminal.textarea?.addEventListener("focus", syncCursor);
  terminal.textarea?.addEventListener("blur", syncCursor);
  const notifyParsed = () => {
    syncCursor();
    for (const listener of parsed) listener();
  };
  const rendered = terminal.onRender(() => {
    const durationMs = renderWork.takeRendered();
    if (durationMs === null) return;
    for (const listener of renderedListeners) listener(durationMs);
  });
  const refresh = () => terminal.refresh(0, Math.max(0, terminal.rows - 1));
  const output = createCoalescedXtermWriter(
    (bytes, complete) => {
      const finishWork = renderWork.begin();
      terminal.write(bytes, () => { finishWork(); complete(); });
    },
    notifyParsed,
  );
  const writeOutput = (bytes: Uint8Array) => output.writeAndWait(bytes);
  const waitForText = createTerminalTextWait(
    () => readScreen(terminal),
    (callback) => { parsed.add(callback); return { dispose: () => { parsed.delete(callback); } }; },
  );
  const fit = () => {
    if (container.isConnected && container.clientWidth > 0 && container.clientHeight > 0) fitAddon.fit();
  };
  fit();
  syncCursor();

  return {
    root: container, fit, size: () => ({ cols: terminal.cols, rows: terminal.rows }),
    applySnapshot: async (snapshot) => {
      if (typeof snapshot.paint !== "string") throw new Error("terminal snapshot has no paint");
      await writeOutput(decodeBase64(snapshot.paint as string));
      refresh();
    },
    writeOutput,
    onRendered(callback) {
      renderedListeners.add(callback);
      return { dispose: () => { renderedListeners.delete(callback); } };
    },
    read: (lines) => readScreen(terminal, lines),
    waitForText,
    focus: () => { terminal.focus(); return !!terminal.textarea && terminal.textarea.ownerDocument.activeElement === terminal.textarea; },
    prepareFocusTransfer: () => { ime.flushPending(); terminal.textarea?.blur(); },
    refresh,
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
      renderWork.dispose();
      output.dispose(); parsed.clear(); renderedListeners.clear(); rendered.dispose(); stopTheme(); input.dispose(); cursorHidden.dispose(); cursorShown.dispose();
      cursorMoved.dispose(); terminal.textarea?.removeEventListener("focus", syncCursor);
      terminal.textarea?.removeEventListener("blur", syncCursor);
      terminal.textarea?.removeEventListener("keydown", keyFallback, true); ime.dispose(); terminal.dispose();
      delete container.dataset.terminalIme; container.replaceChildren();
    },
  };
}

export function createXtermRenderWorkMeasurement(
  scheduleFrame: (callback: () => void) => () => void,
  now: () => number = () => performance.now(),
): {
  begin(): () => void;
  takeRendered(): number | null;
  dispose(): void;
} {
  let pendingWrites = 0;
  let parsed = false;
  let frameStartedAt: number | null = null;
  let cancelFrame: (() => void) | null = null;
  let disposed = false;
  const arm = () => {
    if (disposed || cancelFrame || (pendingWrites === 0 && !parsed)) return;
    cancelFrame = scheduleFrame(() => {
      cancelFrame = null;
      if (disposed) return;
      frameStartedAt = now();
      arm();
    });
  };
  return {
    begin() {
      if (disposed) return () => undefined;
      pendingWrites += 1;
      arm();
      let ended = false;
      return () => {
        if (ended) return;
        ended = true;
        pendingWrites = Math.max(0, pendingWrites - 1);
        parsed = true;
        arm();
      };
    },
    takeRendered() {
      if (!parsed || frameStartedAt === null) return null;
      const measured = Math.max(0, now() - frameStartedAt);
      parsed = false;
      if (pendingWrites === 0 && cancelFrame) {
        cancelFrame();
        cancelFrame = null;
      }
      return measured;
    },
    dispose() {
      disposed = true;
      cancelFrame?.();
      cancelFrame = null;
      pendingWrites = 0;
      parsed = false;
      frameStartedAt = null;
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

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
  const rendered = new Set<(text: string) => void>();
  const renderListener = terminal.onRender(() => {
    const text = readScreen(terminal); for (const listener of rendered) listener(text);
  });
  const fit = () => {
    if (container.isConnected && container.clientWidth > 0 && container.clientHeight > 0) fitAddon.fit();
  };
  fit();

  return {
    root: container, fit, size: () => ({ cols: terminal.cols, rows: terminal.rows }),
    applySnapshot: async (snapshot) => {
      if (typeof snapshot.paint !== "string") throw new Error("terminal snapshot has no paint");
      await new Promise<void>((resolve) => terminal.write(decodeBase64(snapshot.paint as string), resolve));
      terminal.refresh(0, Math.max(0, terminal.rows - 1));
    },
    writeOutput: (bytes) => { terminal.write(bytes); },
    read: (lines) => readScreen(terminal, lines),
    waitForText(contains, timeoutMs) {
      const current = readScreen(terminal);
      if (current.includes(contains)) return Promise.resolve(current);
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => { rendered.delete(onRender); reject(new Error(`terminal text wait timed out after ${timeoutMs}ms`)); }, timeoutMs);
        const onRender = (text: string) => {
          if (!text.includes(contains)) return; clearTimeout(timer); rendered.delete(onRender); resolve(text);
        };
        rendered.add(onRender);
      });
    },
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
      stopTheme(); input.dispose(); renderListener.dispose(); ime.dispose(); terminal.dispose();
      delete container.dataset.terminalIme; container.replaceChildren();
    },
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

import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { injectStyles } from "./styles";

import { createSerialTerminalWriter, routeXtermData } from "./input";
import { attachTerminalInputTrace, type BrowserInputTrace, type TerminalInputTrace } from "./inputTrace";
import { observeTerminalTheme, readTerminalTheme } from "./theme";
import { WebkitImeAddon } from "xterm-addon-webkit-ime";
import {
  createRendererPayload,
  summarizeRendererSamples,
  type RendererBenchmarkMode,
  type RendererSampleSummary,
} from "./rendererBenchmark";

/** What the host answers with when a session opens. Opaque here: the host mints
 *  it and every later call names the session by it. */
export type TerminalHandle = number;

/** The host's PTY capability, narrowed to what this plugin calls.
 *
 *  Bytes arrive through onData rather than through an event this plugin names.
 *  A plugin that subscribed to its backend's event directly would be a private
 *  channel, and everything the capability observes on the way — the working
 *  directory, command boundaries, buffer reads — would stop happening. */
export type TerminalBinding = {
  open(paneId: string, cols: number, rows: number): Promise<TerminalHandle>;
  write(handle: TerminalHandle, data: string): Promise<void>;
  resize(handle: TerminalHandle, cols: number, rows: number): Promise<void>;
  close(handle: TerminalHandle): Promise<void>;
  onData(handle: TerminalHandle, callback: (bytes: Uint8Array) => void): { dispose(): void };
  /** Hands the host a way to read this screen and to type into it.
   *
   *  Without it the host's own terminal surfaces answer "not ready" for a pane
   *  that is running: term.read, term.send and app.terminal.readBuffer all
   *  resolve through this registration. The screen is this plugin's, so
   *  the host cannot read it any other way. */
  registerIo(
    paneId: string,
    io: { readBuffer: (lines?: number) => string; sendInput: (data: string) => void },
  ): { dispose(): void };
  traceInput(handle: TerminalHandle, event: TerminalInputTrace): Promise<void>;
};

/** One mounted screen, and what an outside caller can do to it.
 *
 *  read and send are here rather than in the host: the host owns the PTY, this
 *  plugin owns the screen, and reading a screen is a question about glyphs on
 *  it. A host command that answered it would need this plugin's buffer, which
 *  is how `term.read` came to sit in the core (CORE-CENSUS 3). */
export interface TerminalScreen {
  stop: () => void;
  read: (lines?: number) => string;
  send: (data: string) => void;
  /** Focus the one xterm textarea that owns keyboard input and report actual landing. */
  focus: () => boolean;
  /** Commit transient IME state and release the source responder before another view focuses. */
  prepareFocusTransfer: () => void;
  benchmark: (request: RendererBenchmarkRequest) => Promise<RendererBenchmarkReport>;
}

export interface RendererBenchmarkRequest {
  mode: RendererBenchmarkMode;
  bytes: number;
  repetitions: number;
}

export interface RendererBenchmarkReport extends RendererSampleSummary {
  engine: "xterm";
  mode: RendererBenchmarkMode;
  bytesPerSample: number;
  repetitions: number;
  cols: number;
  rows: number;
}

export function mountTerminal(host: HTMLElement, id: string, binding: TerminalBinding): TerminalScreen {
  // Once per document, before xterm builds its DOM. Without these rules the
  // screen renders as unstyled spans.
  injectStyles();
  // Colours are the host's. The terminal reads its slots and follows them, so a
  // theme change repaints the glyphs instead of stopping at the chrome.
  const themeRoot = host.ownerDocument.documentElement;
  const terminal = new Terminal({
    cursorBlink: true,
    convertEol: true,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 13,
    theme: readTerminalTheme(themeRoot),
  });
  const stopTheme = observeTerminalTheme(themeRoot, () => {
    terminal.options.theme = readTerminalTheme(themeRoot);
  });
  const fit = new FitAddon();
  terminal.loadAddon(fit);
  terminal.open(host);
  // The plugin owns these nodes, so it also owns their public names. Without the textarea address
  // an IME incident can be observed only by reaching into xterm's private class names, and neither
  // composition events nor focus can be reproduced through the command surface.
  if (terminal.element) terminal.element.dataset.node = "screen";
  if (terminal.textarea) terminal.textarea.dataset.node = "input";
  host.dataset.terminalIme = "webkit";
  let handle: TerminalHandle | null = null;
  let output: { dispose(): void } | null = null;
  let io: { dispose(): void } | null = null;
  let disposed = false;
  let traceSequence = 0;
  const pendingTrace: TerminalInputTrace[] = [];
  const record = (event: BrowserInputTrace): void => {
    const trace = { ...event, sequence: ++traceSequence };
    const owner = handle;
    if (owner) {
      void binding.traceInput(owner, trace);
      return;
    }
    pendingTrace.push(trace);
    if (pendingTrace.length > 64) pendingTrace.shift();
  };
  const stopInputTrace = terminal.textarea
    ? attachTerminalInputTrace(terminal.textarea, record)
    : () => undefined;

  const write = createSerialTerminalWriter(async (data) => {
    const owner = handle;
    if (owner) {
      record({ kind: "pty-write", data });
      await binding.write(owner, data);
    }
  });
  const ime = new WebkitImeAddon({
    onData: (data) => {
      record({ kind: "addon-output", data });
      void write(data);
    },
    onDebug: (message) => record({ kind: "addon-debug", message }),
  });
  terminal.loadAddon(ime);

  const resizeNow = () => {
    if (!host.isConnected || host.clientWidth <= 0 || host.clientHeight <= 0) return;
    fit.fit();
    if (handle && terminal.cols > 0 && terminal.rows > 0) void binding.resize(handle, terminal.cols, terminal.rows);
  };
  let resizeFrame: number | null = null;
  const scheduleResize = () => {
    if (resizeFrame !== null) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = null;
      resizeNow();
    });
  };
  const observer = new ResizeObserver(scheduleResize);
  observer.observe(host);
  const input = terminal.onData((data) => {
    record({ kind: "xterm-data", data });
    routeXtermData(ime, write, data);
  });

  requestAnimationFrame(() => {
    if (disposed || !host.isConnected) return;
    resizeNow();
    void binding.open(id, terminal.cols || 80, terminal.rows || 24).then((opened) => {
      if (disposed) { void binding.close(opened); return; }
      handle = opened;
      // Bytes only after the session exists: the handle is what addresses them,
      // and there is nothing to subscribe to before it.
      output = binding.onData(opened, (bytes) => terminal.write(bytes));
      // The host reads this screen and types into it through this registration.
      // Registering before the session exists would hand over a screen with no
      // shell behind it, and a write would go nowhere while reporting success.
      io = binding.registerIo(id, {
        readBuffer: (lines) => readScreen(terminal, lines),
        sendInput: (data) => { void write(data); },
      });
      for (const trace of pendingTrace.splice(0)) void binding.traceInput(opened, trace);
      resizeNow();
    });
  });

  const stop = (): void => {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
    stopTheme();
    output?.dispose();
    io?.dispose();
    input.dispose();
    stopInputTrace();
    ime.dispose();
    if (handle) void binding.close(handle);
    terminal.dispose();
    delete host.dataset.terminalIme;
  };

  return {
    stop,
    read: (lines) => readScreen(terminal, lines),
    send: (data) => { void write(data); },
    focus: () => {
      terminal.focus();
      return !!terminal.textarea && terminal.textarea.ownerDocument.activeElement === terminal.textarea;
    },
    prepareFocusTransfer: () => {
      // The addon owns non-standard WebKit preedit; xterm owns the standard composition path.
      // Flush the former first, then blur the canonical textarea so WebKit commits the latter.
      ime.flushPending();
      terminal.textarea?.blur();
    },
    benchmark: async (request) => {
      const payload = createRendererPayload(request.mode, request.bytes);
      const samplesMs: number[] = [];
      for (let index = 0; index < request.repetitions; index += 1) {
        const started = performance.now();
        await new Promise<void>((resolve) => {
          terminal.write(payload, () => {
            samplesMs.push(performance.now() - started);
            resolve();
          });
        });
      }
      return {
        engine: "xterm",
        mode: request.mode,
        bytesPerSample: payload.byteLength,
        repetitions: request.repetitions,
        cols: terminal.cols,
        rows: terminal.rows,
        ...summarizeRendererSamples(samplesMs, payload.byteLength),
      };
    },
  };
}

/** The screen as text, newest lines last.
 *
 * The host reads this to answer term.read and to observe a pane without
 * drawing it. lines bounds the read: a full scrollback is megabytes, and the
 * caller almost always wants what is on screen now.
 */
function readScreen(terminal: Terminal, lines?: number): string {
  const buffer = terminal.buffer.active;
  const last = buffer.baseY + terminal.rows;
  const first = lines && lines > 0 ? Math.max(0, last - lines) : 0;
  const read: string[] = [];
  for (let row = first; row < last; row++) {
    read.push(buffer.getLine(row)?.translateToString(true) ?? "");
  }
  return read.join("\n");
}

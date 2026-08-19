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
  open(
    paneId: string,
    cols: number,
    rows: number,
    replay: "none" | { fromSeq: number },
  ): Promise<TerminalHandle>;
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
  paneAlive(paneId: string): Promise<boolean>;
  sidecarRequest(request: Record<string, unknown>): Promise<Record<string, unknown>>;
};

export type TerminalMountStatus = { code: string; message?: string } | null;

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

export function mountTerminal(
  host: HTMLElement,
  id: string,
  binding: TerminalBinding,
  reportStatus: (status: TerminalMountStatus) => void = () => undefined,
): TerminalScreen {
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
  let opening = false;
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
  const setRestoreStatus = (state: string, message?: string): void => {
    for (const node of [host, terminal.element]) {
      if (!node) continue;
      node.dataset.terminalRestore = state;
      if (message) node.dataset.terminalRestoreError = message;
      else delete node.dataset.terminalRestoreError;
    }
    reportStatus(state === "error" || state === "degraded"
      ? { code: `terminal.restore.${state}`, message }
      : null);
  };
  const requireSidecarReply = (
    reply: Record<string, unknown>,
    operation: string,
  ): Record<string, unknown> => {
    if (reply.ok !== true) {
      const code = typeof reply.code === "string" ? reply.code : "FAILED";
      const message = typeof reply.message === "string" ? reply.message : "no error message";
      throw new Error(`${operation} failed (${code}): ${message}`);
    }
    const data = reply.data;
    return data && typeof data === "object" ? data as Record<string, unknown> : {};
  };
  const paintSnapshot = async (paint: string): Promise<void> => {
    const decoded = atob(paint);
    const bytes = Uint8Array.from(decoded, (character) => character.charCodeAt(0));
    await new Promise<void>((resolve) => terminal.write(bytes, resolve));
  };
  const restore = async (): Promise<"none" | { fromSeq: number }> => {
    setRestoreStatus("checking");
    if (!await binding.paneAlive(id)) return "none";
    requireSidecarReply(await binding.sidecarRequest({
      op: "resize", pane: id, cols: terminal.cols || 80, rows: terminal.rows || 24,
    }), "resize");
    const restored = requireSidecarReply(
      await binding.sidecarRequest({ op: "rehydrate", pane: id }),
      "rehydrate",
    );
    if (typeof restored.paint !== "string" ||
        typeof restored.uptoSeq !== "number" ||
        !Number.isSafeInteger(restored.uptoSeq) || restored.uptoSeq < 0) {
      throw new Error("rehydrate returned an invalid paint or uptoSeq");
    }
    await paintSnapshot(restored.paint);
    setRestoreStatus("warm");
    return { fromSeq: restored.uptoSeq };
  };
  const openWhenSized = () => {
    if (
      disposed || opening || handle !== null || !host.isConnected ||
      host.clientWidth <= 0 || host.clientHeight <= 0
    ) return;
    resizeNow();
    opening = true;
    void restore().then((replay) => binding.open(
      id, terminal.cols || 80, terminal.rows || 24, replay,
    )).then(
      (opened) => {
        opening = false;
        if (disposed) {
          void binding.close(opened);
          return;
        }
        handle = opened;
        output = binding.onData(opened, (bytes) => terminal.write(bytes));
        io = binding.registerIo(id, {
          readBuffer: (lines) => readScreen(terminal, lines),
          sendInput: (data) => { void write(data); },
        });
        for (const trace of pendingTrace.splice(0)) void binding.traceInput(opened, trace);
        resizeNow();
        if (host.dataset.terminalRestore === "checking") {
          void binding.sidecarRequest({
            op: "ensureSession", pane: id, cols: terminal.cols || 80, rows: terminal.rows || 24,
          }).then(
            (reply) => {
              requireSidecarReply(reply, "ensureSession");
              setRestoreStatus("fresh");
            },
            (error: unknown) => setRestoreStatus("degraded", String(error)),
          );
        }
      },
      (error: unknown) => {
        opening = false;
        setRestoreStatus("error", String(error));
      },
    );
  };
  let resizeFrame: number | null = null;
  const scheduleResize = () => {
    openWhenSized();
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
  queueMicrotask(openWhenSized);

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
    for (const node of [host, terminal.element]) {
      if (!node) continue;
      delete node.dataset.terminalRestore;
      delete node.dataset.terminalRestoreError;
    }
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
      const scratch = new Terminal({
        cols: terminal.cols,
        rows: terminal.rows,
        scrollback: terminal.options.scrollback,
      });
      try {
        for (let index = 0; index < request.repetitions; index += 1) {
          const started = performance.now();
          await new Promise<void>((resolve) => {
            scratch.write(payload, () => {
              samplesMs.push(performance.now() - started);
              resolve();
            });
          });
        }
      } finally {
        scratch.dispose();
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

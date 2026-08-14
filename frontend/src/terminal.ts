import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

import { createSerialTerminalWriter, routeXtermData } from "./input";
import { attachTerminalInputTrace, type BrowserInputTrace, type TerminalInputTrace } from "./inputTrace";
import { terminalBytes } from "./stream";
import { WebkitImeAddon } from "xterm-addon-webkit-ime";

export type TerminalHandle = { id: string; generation: number };
export type TerminalOutput = TerminalHandle & { dataBase64: string };
export type TerminalBinding = {
  open(id: string, cols: number, rows: number): Promise<TerminalHandle>;
  write(handle: TerminalHandle, data: string): Promise<void>;
  resize(handle: TerminalHandle, cols: number, rows: number): Promise<void>;
  close(handle: TerminalHandle): Promise<void>;
  traceInput(handle: TerminalHandle, event: TerminalInputTrace): Promise<void>;
};
export type TerminalEvents = { onOutput(callback: (output: TerminalOutput) => void): () => void };

export function mountTerminal(host: HTMLElement, id: string, binding: TerminalBinding, events: TerminalEvents): () => void {
  const terminal = new Terminal({
    cursorBlink: true,
    convertEol: true,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 13,
    theme: { background: "#0b0d10", foreground: "#d7e0ea", cursor: "#ff9f6e" },
  });
  const fit = new FitAddon();
  terminal.loadAddon(fit);
  terminal.open(host);
  host.dataset.terminalIme = "webkit";
  let handle: TerminalHandle | null = null;
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

  const resize = () => {
    if (!host.isConnected || host.clientWidth <= 0 || host.clientHeight <= 0) return;
    fit.fit();
    if (handle && terminal.cols > 0 && terminal.rows > 0) void binding.resize(handle, terminal.cols, terminal.rows);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const stopOutput = events.onOutput((output) => {
    if (handle && output.id === handle.id && output.generation === handle.generation) terminal.write(terminalBytes(output.dataBase64));
  });
  const input = terminal.onData((data) => {
    record({ kind: "xterm-data", data });
    routeXtermData(ime, write, data);
  });

  requestAnimationFrame(() => {
    if (disposed || !host.isConnected) return;
    resize();
    void binding.open(id, terminal.cols || 80, terminal.rows || 24).then((opened) => {
      if (disposed) { void binding.close(opened); return; }
      handle = opened;
      for (const trace of pendingTrace.splice(0)) void binding.traceInput(opened, trace);
      resize();
    });
  });

  return () => {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    stopOutput();
    input.dispose();
    stopInputTrace();
    ime.dispose();
    if (handle) void binding.close(handle);
    terminal.dispose();
    delete host.dataset.terminalIme;
  };
}

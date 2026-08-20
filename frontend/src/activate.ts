import { sentence, t } from "./i18n";
import { mountTerminal, type TerminalBinding, type TerminalScreen } from "./terminal";

// The plugin's entry. The host calls activate(ctx); this registers the view and
// the commands the manifest declares. The host registers nothing on the
// plugin's behalf.
//
// The terminal binding is the host's PTY commands. This plugin owns xterm and
// the input path; the file descriptor is held by the process that opened it.

/** What this plugin needs from the host: a subset of the plugin API, declared
 *  here so every shape this file depends on is visible in one place. */
export interface TerminalHost {
  ui: {
    registerView(viewId: string, provider: {
      mount(container: HTMLElement, ctx: unknown): void;
      unmount?(container: HTMLElement): void;
      prepareFocusTransfer?(container: HTMLElement, ctx: unknown): void;
      focus?(container: HTMLElement, ctx: unknown, request: { signal: AbortSignal }): void;
    }): { dispose(): void };
    /** One reading or control in the status bar of the group showing a view. The
     *  host places it and reads nothing into it. */
    statusBarItem?(item: {
      id: string;
      paneId: string;
      label: string;
      title?: string;
      side?: "left" | "right";
      onClick?: () => void;
    }): { dispose(): void };
  };
  commands: {
    register(name: string, spec: Record<string, unknown>): { dispose(): void } | void;
    execute?(name: string, params?: Record<string, unknown>): Promise<unknown>;
  };
  /** The host's display language. This plugin translates its own strings. */
  locale(): string;
  /** Observation of a pane's shell, granted by the "terminal" permission. The
   *  host parses OSC 7/133/633 out of the byte stream — a protocol decoder every
   *  plugin reading a PTY would otherwise write again — and this reads the
   *  answer. What the answer *means* is decided here. */
  terminal?: {
    getCwd?(paneId: string): string | undefined;
    onCwd?(paneId: string, listener: (cwd: string) => void): { dispose(): void };
    /** Hand the host's decoder this pane's raw output.
     *
     *  The host parses OSC 7/133/633 out of it and answers getCwd and the command events from what
     *  it found. It decodes and decides nothing — what a command boundary means is decided here.
     *
     *  The host sees no bytes otherwise: the shell is a unit this plugin drives, and the stream goes
     *  from that unit to this code. Without this call every reading above stays empty on a pane that
     *  is running perfectly, which reads as shell integration that is broken. */
    observe?(paneId: string, bytes: Uint8Array): void;
    /** Hand the host a way to read this screen and to type into it.
     *
     *  Without it the host's own terminal surfaces answer "not ready" for a pane that is running:
     *  term.read, term.send and app.terminal.readBuffer all resolve through this registration. The
     *  screen is this plugin's, so the host cannot reach it any other way. */
    registerIo?(
      paneId: string,
      io: { readBuffer: (lines?: number) => string; sendInput: (data: string) => void },
    ): { dispose(): void };
  };
  /** The host's event bus. `command.started` and `command.finished` are what the
   *  OSC 133/633 decoder publishes; what they should look like on screen is
   *  decided here. */
  events?: {
    on?(
      event: string,
      listener: (payload: {
        paneId?: string;
        commandLine?: string;
        paths?: string[];
        windowLabel?: string;
      }) => void,
    ): { dispose(): void };
  };
  /** The units this plugin declared, granted by the "sidecar" permission.
   *
   *  A shell reaches this plugin through the unit its manifest declared and through nothing else.
   *  The host opens only a declared name, refuses one whose installed release implements a different
   *  contract, and passes requests through without reading them — so what a request means is this
   *  plugin's business with its unit, and the host has no opinion about terminals. */
  sidecar: {
    open(name: string): Promise<SidecarChannel>;
  };
}

/** One opened unit. What crosses it means whatever this plugin's contract with it says. */
export interface SidecarChannel {
  send(request: Record<string, unknown>): Promise<Record<string, unknown>>;
  stream(
    request: Record<string, unknown>,
    handlers: { onBytes: (data: Uint8Array) => void; onEnd?: (reason: string) => void },
  ): Promise<{ answer: Record<string, unknown>; close: { dispose(): void } }>;
  close(): Promise<void>;
}

export interface ActivateContext {
  app: TerminalHost;
  subscriptions: { dispose(): void }[];
}

/** A path as one shell word.
 *
 *  Everything outside the unreserved set is escaped rather than quoted: a
 *  filename holding a quote breaks out of quoting, and a space or a `$` in a
 *  bare path becomes two words or an expansion. */
function quoteForShell(path: string): string {
  return path.replace(/[^A-Za-z0-9_./@%+:,=-]/g, "\\$&");
}

/** One terminal per mounted container. */
export function activate(ctx: ActivateContext): void {
  const app = ctx.app;
  // Keyed by view id — the stable identity of this view instance, and what an
  // outside caller names. Keyed by container, a command could reach a screen
  // only by already holding its element.
  const screens = new Map<
    string,
    {
      screen: TerminalScreen;
      container: HTMLElement;
      setStatus: (status: { code: string; message?: string } | null) => void;
    }
  >();
  const binding = ptyBinding(app);

  // A window this plugin opened sessions under has gone, so the unit is told to let them go.
  //
  // Nothing else will: the plugin instance in that window died with it, and the unit holds shells
  // that outlive an application generation on purpose — which is exactly why they do not end by
  // themselves. Without this, every closed window leaves its shells running until the application
  // quits and the unit is reaped.
  //
  // This instance is in a window that survived. Which sessions belong to which window is the unit's
  // record, keyed by the label the caller sent when it opened them.
  const windowGone = app.events?.on?.("window.gone", (payload) => {
    const windowLabel = payload.windowLabel;
    if (typeof windowLabel !== "string" || windowLabel === "") return;
    void binding.closeWindow(windowLabel);
  });
  if (windowGone) ctx.subscriptions.push(windowGone);
  const screenOf = (container: HTMLElement): TerminalScreen | null => {
    for (const mounted of screens.values()) {
      if (mounted.container === container) return mounted.screen;
    }
    return null;
  };

  /** This screen's working directory, and what kind of screen it is, in the status bar.
   *
   *  The host decodes OSC 7 and answers where the shell says it is. That a person wants to see it,
   *  on the left, and that "~" stands in before the shell has said anything, are decisions — and
   *  they are this plugin's. A host that made them would be drawing one kind of content's status
   *  line on its behalf, which is what it did until 2026-08-16. */
  const showCwd = (key: string): void => {
    const place = (cwd: string | undefined) => {
      const item = app.ui.statusBarItem?.({
        id: `cwd:${key}`,
        paneId: key,
        label: cwd ?? "~",
        title: cwd,
        side: "left",
      });
      if (item) ctx.subscriptions.push(item);
    };
    place(app.terminal?.getCwd?.(key));
    const following = app.terminal?.onCwd?.(key, (cwd) => place(cwd));
    if (following) ctx.subscriptions.push(following);
    const label = app.ui.statusBarItem?.({
      id: `kind:${key}`,
      paneId: key,
      label: t("terminal.label", app.locale()),
    });
    if (label) ctx.subscriptions.push(label);
  };

  const view = app.ui.registerView("content", {
    mount(container, viewContext) {
      // The address every outside caller uses to reach this screen.
      container.dataset.node = "screen";
      const key = sessionKeyOf(viewContext);
      container.dataset.terminalView = key;
      const status = (viewContext as { setStatus?: unknown } | null)?.setStatus;
      const setStatus = typeof status === "function"
        ? (status as (s: { code: string; message?: string } | null) => void)
        : () => {};
      screens.set(key, {
        screen: mountTerminal(container, key, binding, setStatus),
        container,
        setStatus,
      });
      showCwd(key);
    },
    unmount(container) {
      // Only when this is still the container the key names.
      //
      // A remount hands over a new element under the same view id, and the old element's unmount
      // arrives after the new one's mount. Stopping by key alone disposes the screen that just
      // opened: the shell keeps running with nothing drawing it, so the pane is blank and a read
      // answers empty lines. Measured 2026-08-16 — four views mounted, three shells alive, every
      // screen empty.
      const key = container.dataset.terminalView ?? "";
      const found = screens.get(key);
      if (!found || found.container !== container) return;
      found.screen.stop();
      screens.delete(key);
    },
    prepareFocusTransfer(container) {
      screenOf(container)?.prepareFocusTransfer();
    },
    focus(container, _viewContext, request) {
      if (request.signal.aborted) return;
      screenOf(container)?.focus();
    },
  });
  ctx.subscriptions.push(view);

  register(app, ctx, "clear", {
    description: sentence("terminal.clear.description"),
    params: {},
    returns: "{ cleared }",
    message: () => sentence("terminal.cleared"),
    handler: () => {
      for (const screen of screens.values()) {
        screen.container.dispatchEvent(new CustomEvent("soksak:terminal-clear"));
      }
      return { cleared: screens.size };
    },
  });

  /** The screen a call is about, or the refusal that names why there is none.
   *
   *  Named view first, then the pane the call came from, then the only one
   *  mounted. Never a guess between two: a caller that reaches the wrong shell
   *  finds out from what the shell did.
   *
   *  Returned rather than thrown. A thrown error reaches the caller as INTERNAL
   *  with the sentence replaced — "this failed unexpectedly" — and a refusal
   *  that states which screens exist is exactly what the caller needs. */
  type Refusal = { ok: false; code: string; message: string; data?: Record<string, unknown> };
  const isRefusal = (v: unknown): v is Refusal =>
    !!v && typeof v === "object" && (v as { ok?: unknown }).ok === false;

  const target = (
    params: Record<string, unknown>,
    context?: { pane?: string },
  ): { screen: TerminalScreen; key: string } | Refusal => {
    const open = [...screens.keys()];
    const named = typeof params.view === "string" ? params.view : "";
    if (named) {
      const found = screens.get(named);
      if (!found) {
        return {
          ok: false,
          code: "TARGET_NOT_FOUND",
          message: t("terminal.noSuchView", app.locale()),
          data: { view: named, open },
        };
      }
      return { screen: found.screen, key: named };
    }
    const pane = context?.pane ?? "";
    const here = pane ? screens.get(pane) : undefined;
    if (here) return { screen: here.screen, key: pane };
    if (screens.size === 1) {
      const [key, only] = [...screens.entries()][0];
      return { screen: only.screen, key };
    }
    return screens.size === 0
      ? { ok: false, code: "TARGET_NOT_FOUND", message: t("terminal.noSession", app.locale()) }
      : {
          ok: false,
          code: "AMBIGUOUS",
          message: t("terminal.ambiguous", app.locale()),
          data: { open },
        };
  };

  const viewParam = {
    type: "string",
    description: sentence("terminal.param.view"),
  };

  register(app, ctx, "send", {
    description: sentence("terminal.send.description"),
    params: { data: { type: "string", description: sentence("terminal.param.data"), required: true }, view: viewParam },
    returns: "{ sent, view }",
    danger: "inject",
    message: () => sentence("terminal.sent"),
    handler: (params: Record<string, unknown>, context?: { pane?: string }) => {
      const data = typeof params.data === "string" ? params.data : "";
      const found = target(params, context);
      if (isRefusal(found)) return found;
      found.screen.send(data);
      return { sent: data.length, view: found.key };
    },
  });

  register(app, ctx, "read", {
    description: sentence("terminal.read.description"),
    params: {
      lines: { type: "number", description: sentence("terminal.param.lines") },
      view: viewParam,
    },
    returns: "{ view, text }",
    message: (d: Record<string, unknown>) =>
      t("terminal.read.answer", app.locale()).replace(
        "{n}",
        String(String(d.text ?? "").length),
      ),
    handler: (params: Record<string, unknown>, context?: { pane?: string }) => {
      const found = target(params, context);
      if (isRefusal(found)) return found;
      const lines = typeof params.lines === "number" ? params.lines : undefined;
      return { view: found.key, text: found.screen.read(lines) };
    },
  });

  register(app, ctx, "exec", {
    description: sentence("terminal.exec.description"),
    params: {
      cmd: { type: "string", description: sentence("terminal.param.cmd"), required: true },
      view: viewParam,
    },
    returns: "{ view, sent }",
    danger: "inject",
    message: () => sentence("terminal.exec.answer"),
    handler: (params: Record<string, unknown>, context?: { pane?: string }) => {
      const cmd = typeof params.cmd === "string" ? params.cmd : "";
      const found = target(params, context);
      if (isRefusal(found)) return found;
      // The Enter is what runs it. Sending the line alone leaves it typed and
      // unrun, and the caller reads a prompt that looks like a finished command.
      found.screen.send(`${cmd}\r`);
      return { view: found.key, sent: cmd.length + 1 };
    },
  });

  register(app, ctx, "cwd", {
    description: sentence("terminal.cwd.description"),
    params: { view: viewParam },
    returns: "{ view, cwd }",
    message: (d: Record<string, unknown>) =>
      t("terminal.cwd.answer", app.locale()).replace("{cwd}", String(d.cwd ?? "—")),
    handler: (params: Record<string, unknown>, context?: { pane?: string }) => {
      const found = target(params, context);
      if (isRefusal(found)) return found;
      // Absent means the shell has not reported one — no integration, or not yet.
      // Answering a guess here would be answering the wrong directory.
      return { view: found.key, cwd: app.terminal?.getCwd?.(found.key) ?? null };
    },
  });

  register(app, ctx, "benchmark.parser", {
    description: sentence("terminal.benchmark.description"),
    params: {
      mode: {
        type: "string",
        enum: ["printable", "adversarial"],
        default: "printable",
        description: sentence("terminal.benchmark.param.mode"),
      },
      bytes: {
        type: "number",
        default: 1_048_576,
        description: sentence("terminal.benchmark.param.bytes"),
      },
      repetitions: {
        type: "number",
        default: 3,
        description: sentence("terminal.benchmark.param.repetitions"),
      },
      view: viewParam,
    },
    returns: "{ engine, view, mode, bytesPerSample, repetitions, samplesMs, elapsedMs, totalBytes, p50Ms, p95Ms, maxMs, throughputMiBps, cols, rows }",
    message: (data: Record<string, unknown>) =>
      t("terminal.benchmark.answer", app.locale())
        .replace("{throughput}", Number(data.throughputMiBps ?? 0).toFixed(2)),
    handler: async (params: Record<string, unknown>, context?: { pane?: string }) => {
      const mode = params.mode ?? "printable";
      const bytes = params.bytes ?? 1_048_576;
      const repetitions = params.repetitions ?? 3;
      if (
        (mode !== "printable" && mode !== "adversarial") ||
        !Number.isInteger(bytes) || Number(bytes) < 1 || Number(bytes) > 16 * 1024 * 1024 ||
        !Number.isInteger(repetitions) || Number(repetitions) < 1 || Number(repetitions) > 20
      ) {
        return {
          ok: false,
          code: "INVALID_PARAMS",
          message: t("terminal.benchmark.invalid", app.locale()),
        };
      }
      const found = target(params, context);
      if (isRefusal(found)) return found;
      const measured = await found.screen.benchmark({
        mode,
        bytes: Number(bytes),
        repetitions: Number(repetitions),
      });
      return { view: found.key, ...measured };
    },
  });
}

// The session the last mount opened, for the paths that address the shell
// directly rather than the screen in front of it.
let currentSessionId: number | null = null;

function register(
  app: TerminalHost,
  ctx: ActivateContext,
  name: string,
  spec: Record<string, unknown>,
): void {
  const registration = app.commands.register(name, spec);
  if (registration) ctx.subscriptions.push(registration);
}

/** This view's own identity, which is what keys its session.
 *
 *  viewId, not paneId: the host's paneId names a terminal a view *follows* for
 *  its working directory, which is what a file tree beside a terminal reads. A
 *  content view keying its shell by that would open one session for two tabs,
 *  and with no such terminal it would key by nothing at all. */
function sessionKeyOf(viewContext: unknown): string {
  const context = viewContext as { viewId?: unknown } | null;
  return typeof context?.viewId === "string" ? context.viewId : "";
}

/** The unit this plugin's manifest declares for shells. */
const PTY_UNIT = "pty";

/** The commands on that unit's own socket, as its contract names them. */
const PTY = {
  open: "pty.open",
  write: "pty.write",
  resize: "pty.resize",
  close: "pty.close",
  pane: "pty.pane",
  closeWindow: "pty.closeWindow",
  attach: "pty.attach",
} as const;

/** One request in the envelope the unit answers on. The id is this side's and it is echoed back. */
let requestSeq = 0;
function unitRequest(command: string, request: Record<string, unknown>): Record<string, unknown> {
  requestSeq += 1;
  return { id: `t${requestSeq}`, command, args: { request } };
}

/** The data out of an answer, or a thrown refusal.
 *
 *  A refusal is thrown rather than returned as an empty result, because a caller that cannot tell
 *  the two apart draws an empty terminal and concludes the shell produced nothing. */
function answerOf(response: Record<string, unknown>): Record<string, unknown> {
  if (response.ok !== true) {
    throw new Error(typeof response.error === "string" ? response.error : "the unit refused");
  }
  const result = response.result as { data?: unknown } | undefined;
  return (result?.data ?? {}) as Record<string, unknown>;
}

function encode(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** Drives shells through the declared unit, and hands the host what it needs to observe them.
 *
 *  Every request below is opaque to the host: it opens the unit this manifest declared, checks that
 *  what is installed implements the contract that was declared, and relays. What the requests mean
 *  is this plugin's contract with that unit.
 *
 *  The host is fed on purpose. It decodes OSC 7/133/633 out of the same bytes the screen gets, and
 *  the only reason it can is that this code hands them over — the shell is a separate process now,
 *  and nothing passes through the application on the way.
 */
function ptyBinding(app: TerminalHost): TerminalBinding {
  let channel: Promise<SidecarChannel> | null = null;
  const unit = () => (channel ??= app.sidecar.open(PTY_UNIT));
  // One stream per session, kept so closing a pane ends its stream and no other's.
  const streams = new Map<number, { dispose(): void }>();
  const readers = new Map<number, Set<(bytes: Uint8Array) => void>>();

  return {
    async open(paneId, cols, rows, replay) {
      const opened = answerOf(
        await (await unit()).send(
          unitRequest(PTY.open, { paneId, cols, rows, windowLabel: "" }),
        ),
      );
      const id = Number(opened.session);
      currentSessionId = id;

      // Where to resume from. A session with no history starts at the live edge rather than
      // replaying a ring this screen has drawn none of.
      const fromSeq = replay === "none" ? undefined : replay.fromSeq;
      const { close } = await (await unit()).stream(
        unitRequest(PTY.attach, fromSeq === undefined ? { session: id } : { session: id, fromSeq }),
        {
          onBytes: (bytes) => {
            readers.get(id)?.forEach((reader) => reader(bytes));
            // The host's decoder gets the same bytes the screen does, keyed by the pane. Without
            // this the working directory and the command events stay empty on a running shell.
            app.terminal?.observe?.(paneId, bytes);
          },
        },
      );
      streams.set(id, close);
      return id;
    },
    async write(id, data) {
      answerOf(await (await unit()).send(unitRequest(PTY.write, { session: id, dataB64: encode(data) })));
    },
    async resize(id, cols, rows) {
      answerOf(await (await unit()).send(unitRequest(PTY.resize, { session: id, cols, rows })));
    },
    async close(id) {
      streams.get(id)?.dispose();
      streams.delete(id);
      readers.delete(id);
      answerOf(await (await unit()).send(unitRequest(PTY.close, { session: id })));
    },
    onData(id, callback) {
      let set = readers.get(id);
      if (!set) {
        set = new Set();
        readers.set(id, set);
      }
      set.add(callback);
      return { dispose: () => void readers.get(id)?.delete(callback) };
    },
    registerIo: (paneId, io) =>
      app.terminal?.registerIo?.(paneId, io) ?? { dispose: () => {} },
    async paneAlive(paneId) {
      const held = answerOf(await (await unit()).send(unitRequest(PTY.pane, { paneId })));
      return held.held === true;
    },
    async closeWindow(windowLabel) {
      answerOf(await (await unit()).send(unitRequest(PTY.closeWindow, { windowLabel })));
    },
    async sidecarRequest(request) {
      // The restore unit, which is a different declaration and a different contract. Relayed the
      // same way and read no more here than the host reads it.
      const restore = await app.sidecar.open(RESTORE_UNIT);
      return restore.send(request);
    },
    async traceInput() {
      // The host records input traces when it is asked to. Nothing here reads
      // the answer, and a failed trace must not fail a keystroke.
    },
  };
}

/** The unit this plugin declares for restoring a screen. */
const RESTORE_UNIT = "terminal-vt100";

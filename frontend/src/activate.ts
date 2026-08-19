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
      }) => void,
    ): { dispose(): void };
  };
  /** The PTY capability, granted by the "pty" permission the manifest declares.
   *
   *  This is the only route from this plugin to a shell. Calling the backend's
   *  commands directly would be a private channel: the capability is also what
   *  feeds the host's observation of a session — working directory, command
   *  boundaries, buffer reads — and a plugin that goes around it turns those
   *  off with nothing reporting that it did. */
  pty: {
    spawn(options: { cols: number; rows: number; paneId?: string }): Promise<number>;
    write(id: number, data: string): Promise<void>;
    resize(id: number, cols: number, rows: number): Promise<void>;
    close(id: number): Promise<void>;
    onData(id: number, callback: (bytes: Uint8Array) => void): { dispose(): void };
    registerIo(
      paneId: string,
      io: { readBuffer: (lines?: number) => string; sendInput: (data: string) => void },
    ): { dispose(): void };
  };
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
      screens.set(key, {
        screen: mountTerminal(container, key, binding),
        container,
        setStatus: typeof status === "function"
          ? (status as (s: { code: string; message?: string } | null) => void)
          : () => {},
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

function ptyBinding(app: TerminalHost): TerminalBinding {
  return {
    async open(paneId, cols, rows) {
      // The pane id goes with the session. It is what the host attaches its
      // observation to, and what a reattach after a reload finds it by.
      const id = await app.pty.spawn({ cols, rows, paneId });
      currentSessionId = id;
      return id;
    },
    write: (id, data) => app.pty.write(id, data),
    resize: (id, cols, rows) => app.pty.resize(id, cols, rows),
    close: (id) => app.pty.close(id),
    onData: (id, callback) => app.pty.onData(id, callback),
    registerIo: (paneId, io) => app.pty.registerIo(paneId, io),
    async traceInput() {
      // The host records input traces when it is asked to. Nothing here reads
      // the answer, and a failed trace must not fail a keystroke.
    },
  };
}

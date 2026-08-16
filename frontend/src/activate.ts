import { t } from "./i18n";
import { mountTerminal, type TerminalBinding } from "./terminal";

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
    }): { dispose(): void };
  };
  commands: {
    register(name: string, spec: Record<string, unknown>): { dispose(): void } | void;
    execute?(name: string, params?: Record<string, unknown>): Promise<unknown>;
  };
  /** The host's display language. This plugin translates its own strings. */
  locale(): string;
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

/** One terminal per mounted container. */
export function activate(ctx: ActivateContext): void {
  const app = ctx.app;
  const screens = new Map<HTMLElement, TerminalScreen>();
  const binding = ptyBinding(app);

  const view = app.ui.registerView("content", {
    mount(container, viewContext) {
      // The address every outside caller uses to reach this screen.
      container.dataset.node = "screen";
      const stop = mountTerminal(container, sessionKeyOf(viewContext), binding);
      screens.set(container, { stop, container });
    },
    unmount(container) {
      screens.get(container)?.stop();
      screens.delete(container);
    },
  });
  ctx.subscriptions.push(view);

  register(app, ctx, "clear", {
    description: t("terminal.clear.description", app.locale()),
    params: {},
    returns: "{ cleared }",
    message: () => t("terminal.cleared", app.locale()),
    handler: () => {
      for (const screen of screens.values()) {
        screen.container.dispatchEvent(new CustomEvent("soksak:terminal-clear"));
      }
      return { cleared: screens.size };
    },
  });

  register(app, ctx, "send", {
    description: t("terminal.send.description", app.locale()),
    params: { data: { type: "string", description: "Text to write", required: true } },
    returns: "{ sent }",
    danger: "inject",
    message: () => t("terminal.sent", app.locale()),
    handler: async (params: Record<string, unknown>) => {
      const data = typeof params.data === "string" ? params.data : "";
      if (currentSessionId === null) {
        throw new Error(t("terminal.noSession", app.locale()));
      }
      await app.pty.write(currentSessionId, data);
      return { sent: data.length };
    },
  });
}

interface TerminalScreen {
  stop: () => void;
  container: HTMLElement;
}

// The session the last mount opened. One screen per pane; a command with no
// session refuses rather than writing into another pane's shell.
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

import { activateProviderTerminalPlugin, type ProviderTerminalPluginHost } from "@soksak/soksak-kit-plugin-terminal";

import { sentence, t } from "./i18n";
import { createXtermRendererAdapter, type XtermPresenter } from "./xterm-renderer";

export interface TerminalHost extends ProviderTerminalPluginHost {
  locale(): string;
  terminal?: ProviderTerminalPluginHost["terminal"] & {
    getCwd?(pane: string): string | undefined;
  };
}

export interface ActivateContext {
  app: TerminalHost;
  subscriptions: { dispose(): void }[];
}

export function activate(context: ActivateContext): void {
  const app = context.app;
  const viewParam = { type: "string", description: sentence("terminal.param.view") };
  activateProviderTerminalPlugin(app, context.subscriptions, {
    pluginId: "soksak-plugin-terminal-xterm",
    engineId: "vt100",
    providerSidecar: "terminal-vt100",
    programId: "terminal-xterm",
    label: sentence("terminal.label"),
    renderer: createXtermRendererAdapter(),
    extensions: [
      {
        name: "exec", danger: "inject",
        params: { cmd: { type: "string", required: true, description: sentence("terminal.param.cmd") }, view: viewParam },
        handler(params, screen) {
          const cmd = typeof params.cmd === "string" ? params.cmd : "";
          if (!screen?.writable) return { sent: false };
          screen.send(`${cmd}\r`);
          return { view: screen.pane, sent: cmd.length + 1 };
        },
      },
      {
        name: "cwd", params: { view: viewParam },
        handler(_params, screen) {
          return { view: screen?.pane ?? null, cwd: screen ? app.terminal?.getCwd?.(screen.pane) ?? null : null };
        },
      },
      {
        name: "benchmark.parser",
        params: {
          mode: { type: "string", enum: ["printable", "adversarial"], default: "printable", description: sentence("terminal.benchmark.param.mode") },
          bytes: { type: "number", default: 1_048_576, description: sentence("terminal.benchmark.param.bytes") },
          repetitions: { type: "number", default: 3, description: sentence("terminal.benchmark.param.repetitions") },
          view: viewParam,
        },
        async handler(params, screen) {
          const mode = params.mode ?? "printable";
          const bytes = params.bytes ?? 1_048_576;
          const repetitions = params.repetitions ?? 3;
          if (
            (mode !== "printable" && mode !== "adversarial") ||
            !Number.isInteger(bytes) || Number(bytes) < 1 || Number(bytes) > 16 * 1024 * 1024 ||
            !Number.isInteger(repetitions) || Number(repetitions) < 1 || Number(repetitions) > 20
          ) {
            return { ok: false, code: "INVALID_PARAMS", message: t("terminal.benchmark.invalid", app.locale()) };
          }
          if (!screen) return { ok: false, code: "TARGET_NOT_FOUND" };
          const measured = await (screen.presenter as XtermPresenter).benchmark({
            mode, bytes: Number(bytes), repetitions: Number(repetitions),
          });
          return { view: screen.pane, ...measured };
        },
      },
    ],
  });
}

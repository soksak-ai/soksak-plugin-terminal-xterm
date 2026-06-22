// terminal.* 명령 — ping / send / clear. 매니페스트 contributes.commands 와 1:1.
import type { PluginContext } from "./host";
import type { TerminalInstance } from "./terminal";

// 활성 터미널 인스턴스 레지스트리 (viewId → TerminalInstance).
const activeTerminals = new Map<string, TerminalInstance>();

export function registerTerminal(viewId: string, inst: TerminalInstance): void {
  activeTerminals.set(viewId, inst);
}
export function unregisterTerminal(viewId: string): void {
  activeTerminals.delete(viewId);
}

function firstTerminal(): TerminalInstance | null {
  const iter = activeTerminals.values().next();
  return iter.done ? null : iter.value;
}

export function registerCommands(ctx: PluginContext): void {
  const app = ctx.app;
  if (!app.commands) return;
  const sub = (d: { dispose(): void }) => ctx.subscriptions.push(d);

  sub(
    app.commands.register("ping", {
      description: "Terminal plugin load/version check (E2E).",
      triggers: { ko: "터미널 핑 적재확인 버전" },
      returns: "{ ok, version }",
      handler: () => ({ ok: true, version: "0.1.0" }),
    }),
  );

  sub(
    app.commands.register("send", {
      description: "Send text to the active terminal PTY.",
      triggers: { ko: "터미널 텍스트 전송 입력" },
      params: {
        text: { type: "string", description: "Text to send to the terminal", required: true },
      },
      returns: "{ ok }",
      handler: (p) => {
        const inst = firstTerminal();
        if (!inst) return { ok: false, error: "no active terminal" };
        inst.sendInput(String(p.text ?? ""));
        return { ok: true };
      },
    }),
  );

  sub(
    app.commands.register("clear", {
      description: "Clear the active terminal screen.",
      triggers: { ko: "터미널 지우기 클리어" },
      returns: "{ ok }",
      handler: () => {
        const inst = firstTerminal();
        if (!inst) return { ok: false, error: "no active terminal" };
        inst.clear();
        return { ok: true };
      },
    }),
  );
}

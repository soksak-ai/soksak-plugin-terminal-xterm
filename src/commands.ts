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

  sub(
    app.commands.register("resume", {
      // [단계⑤/R9] 복원된 블록의 claude 세션을 이어간다 — 사용자 명시 액션만(auto-trigger 0). 복원 표식
      // (verified 한 sessionId 블록)에서 이 커맨드를 부른다. sessionId 는 UUID 화이트리스트로 엄격 검증해
      // (코어 ai_session::is_valid_session_id 와 동일 RFC4122 표준 — PTY 로 들어가는 위험 작업이라 양쪽
      // 게이트, defense-in-depth) 위조 history·셸 injection 을 차단한다. UUID 엔 특수문자가 없어 안전.
      description: "Resume a tracked claude session in the active terminal by its sessionId. User-initiated only; the sessionId must be a valid UUID.",
      triggers: { ko: "세션 이어가기 재개 resume" },
      params: { session: { type: "string", description: "claude sessionId (UUID) to resume", required: true } },
      returns: "{ ok, session }",
      handler: (p) => {
        const sid = String(p.session ?? "").trim();
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sid)) {
          return { ok: false, error: "invalid sessionId (UUID required)" };
        }
        const inst = firstTerminal();
        if (!inst) return { ok: false, error: "no active terminal" };
        // 셸 프롬프트에 `claude --resume <uuid>` 입력+실행. UUID 라 shell injection 0. claude 만 추적되므로
        // (codex date-dir 후속) claude 고정. 현재 셸 상태(프롬프트 여부)는 사용자 책임 — 명시 호출이므로.
        inst.sendInput(`claude --resume ${sid}\r`);
        return { ok: true, session: sid };
      },
    }),
  );
}

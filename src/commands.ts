// terminal.* 명령 — ping / send / clear. 매니페스트 contributes.commands 와 1:1.
import type { PluginContext } from "soksak-kit-terminal-common";
import type { TerminalInstance } from "./terminal";

// 활성 터미널 인스턴스 레지스트리 (viewId → TerminalInstance).
const activeTerminals = new Map<string, TerminalInstance>();

export function registerTerminal(viewId: string, inst: TerminalInstance): void {
  activeTerminals.set(viewId, inst);
}
export function unregisterTerminal(viewId: string): void {
  activeTerminals.delete(viewId);
}

function firstEntry(): { viewId: string; inst: TerminalInstance } | null {
  const iter = activeTerminals.entries().next();
  return iter.done ? null : { viewId: iter.value[0], inst: iter.value[1] };
}

// 지정 view(있으면) 또는 첫 활성 터미널을 해소. perf.echo 처럼 단일 대상 타깃팅에 쓴다.
function resolveTerminal(
  view: unknown,
): { viewId: string; inst: TerminalInstance } | null {
  if (typeof view === "string" && view) {
    const inst = activeTerminals.get(view);
    return inst ? { viewId: view, inst } : null;
  }
  return firstEntry();
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
      message: (d) => `터미널 플러그인 ${d.version} 이 적재되어 있습니다.`,
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
      returns: "{ ok, viewId? }",
      message: () => "터미널에 텍스트를 전송했습니다.",
      // 전송은 즉시 돌아온다 — 출력은 잠시 후 그 터미널을 core term.read 로 확인한다(pane=이 viewId).
      hint: (d) =>
        d.ok && typeof d.viewId === "string"
          ? [{ cmd: `sok term.read '{"pane":"${d.viewId}"}'`, why: "잠시 후 이 터미널을 읽어 출력을 확인할 수 있습니다." }]
          : [],
      handler: (p) => {
        const entry = firstEntry();
        if (!entry) return { ok: false, code: "NO_TARGET", message: "no active terminal" };
        entry.inst.sendInput(String(p.text ?? ""));
        return { ok: true, viewId: entry.viewId };
      },
    }),
  );

  sub(
    app.commands.register("clear", {
      description: "Clear the active terminal screen.",
      triggers: { ko: "터미널 지우기 클리어" },
      returns: "{ ok, viewId? }",
      message: () => "터미널 화면을 지웠습니다.",
      handler: () => {
        const entry = firstEntry();
        if (!entry) return { ok: false, code: "NO_TARGET", message: "no active terminal" };
        entry.inst.clear();
        return { ok: true, viewId: entry.viewId };
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
      returns: "{ ok, session, viewId? }",
      message: (d) => `세션 ${d.session} 을 이어갑니다.`,
      // 재개 직후 에이전트가 응답을 스트리밍하기 시작한다 — 잠시 후 term.read 로 관찰할 수 있다.
      hint: (d) =>
        d.ok && typeof d.viewId === "string"
          ? [{ cmd: `sok term.read '{"pane":"${d.viewId}"}'`, why: "잠시 후 이 터미널을 읽어 이어진 세션의 응답을 확인할 수 있습니다." }]
          : [],
      handler: (p) => {
        const sid = String(p.session ?? "").trim();
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sid)) {
          return { ok: false, code: "INVALID_INPUT", message: "invalid sessionId (UUID required)" };
        }
        const entry = firstEntry();
        if (!entry) return { ok: false, code: "NO_TARGET", message: "no active terminal" };
        // 셸 프롬프트에 `claude --resume <uuid>` 입력+실행. UUID 라 shell injection 0. claude 만 추적되므로
        // (codex date-dir 후속) claude 고정. 현재 셸 상태(프롬프트 여부)는 사용자 책임 — 명시 호출이므로.
        entry.inst.sendInput(`claude --resume ${sid}\r`);
        return { ok: true, session: sid, viewId: entry.viewId };
      },
    }),
  );

  sub(
    app.commands.register("perf.stats", {
      // 성능 관찰면(pull) — 카운터는 onData/ACK/write 콜백/onRender 에서 정수 가산만 한다(폴링 0).
      // 하니스는 두 스냅샷의 차분으로 구간(throughput/파싱 백로그/프레임)을 계산한다.
      description:
        "Read per-view terminal performance counters: {writtenBytes, ackSent, writeCbLagMs, rafFrameCount, webglActive, scrollbackRows}. Counters accumulate; diff two snapshots to measure an interval.",
      triggers: { ko: "터미널 성능 카운터 계측 통계" },
      params: {
        view: { type: "string", description: "Target view id (omit = all active terminals)" },
      },
      returns: "{ ok, views: { [viewId]: stats } }",
      message: (d) => `터미널 성능 카운터 ${Object.keys(d.views ?? {}).length}개 뷰를 읽었습니다.`,
      handler: (p) => {
        const views: Record<string, unknown> = {};
        if (typeof p.view === "string" && p.view) {
          const inst = activeTerminals.get(p.view);
          if (!inst) return { ok: false, code: "NO_TARGET", message: `no terminal: ${p.view}` };
          views[p.view] = inst.perfStats();
        } else {
          for (const [viewId, inst] of activeTerminals) views[viewId] = inst.perfStats();
        }
        return { ok: true, views };
      },
    }),
  );

  sub(
    app.commands.register("perf.echo", {
      // t2-L1 입력 레이턴시 프로브: PTY 에 무해 입력(" "+DEL)을 쓰고 다음 출력(onData) 도착까지의
      // 왕복(ms). 측정점 = 플러그인 write→PTY→에코 수신 — 소켓 RPC·페인트는 포함하지 않는다.
      description:
        "Measure one input→echo roundtrip (ms): write a harmless probe to the PTY and time the next output arrival. Excludes socket RPC and paint. Run at a quiet shell prompt.",
      triggers: { ko: "터미널 에코 왕복 레이턴시 프로브" },
      params: {
        view: { type: "string", description: "Target view id (omit = first active terminal)" },
      },
      returns: "{ ok, viewId, roundtripMs }",
      message: (d) => `입력→에코 왕복 ${d.roundtripMs}ms (${d.viewId}).`,
      handler: async (p) => {
        const entry = resolveTerminal(p.view);
        if (!entry) return { ok: false, code: "NO_TARGET", message: "no active terminal" };
        try {
          const roundtripMs = await entry.inst.echoProbe();
          return { ok: true, viewId: entry.viewId, roundtripMs };
        } catch (err) {
          return { ok: false, code: "TIMEOUT", message: String(err) };
        }
      },
    }),
  );
}

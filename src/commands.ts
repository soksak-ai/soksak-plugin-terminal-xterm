// terminal.* 명령 — 공통(send·clear·resume)은 kit 이 렌더러 레지스트리로 등록하고, ping(정체성)·
// perf(계측)는 이 플러그인이 소유한다. 활성 렌더러는 이 레지스트리에 담기고 kit mountTerminalView 가
// 마운트/언마운트로 등록/해지한다(비분할=렌더러, 탭내=활성 pane 위임 프록시).
import {
  registerTerminalCommands,
  createTerminalRegistry,
  type PluginContext,
} from "soksak-kit-terminal-common";

// 이 플러그인의 활성 렌더러 레지스트리 — plugin-entry 가 mountTerminalView 에 넘긴다.
export const terminalRegistry = createTerminalRegistry();

export function registerCommands(ctx: PluginContext): void {
  const app = ctx.app;
  if (!app.commands) return;
  const sub = (d: { dispose(): void }) => ctx.subscriptions.push(d);

  // 공통 명령(send·clear·resume) — kit.
  registerTerminalCommands(ctx, terminalRegistry);

  // ping — 이 플러그인의 정체성/버전.
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
          const r = terminalRegistry.get(p.view);
          if (!r?.perfStats) return { ok: false, code: "NO_TARGET", message: `no terminal: ${p.view}` };
          views[p.view] = r.perfStats();
        } else {
          for (const [viewId, r] of terminalRegistry.entries()) {
            if (r.perfStats) views[viewId] = r.perfStats();
          }
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
        const entry = terminalRegistry.resolve(p.view);
        if (!entry?.renderer.echoProbe) return { ok: false, code: "NO_TARGET", message: "no active terminal" };
        try {
          const roundtripMs = await entry.renderer.echoProbe();
          return { ok: true, viewId: entry.viewId, roundtripMs };
        } catch (err) {
          return { ok: false, code: "TIMEOUT", message: String(err) };
        }
      },
    }),
  );
}

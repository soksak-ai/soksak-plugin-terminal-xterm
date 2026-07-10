// perf 계측면 RED→GREEN — 뷰별 카운터(순수 모듈)와 perf.stats/perf.echo 커맨드 등록.
// RED: 계측면 부재(perf.ts 모듈 없음 + 커맨드 미등록) → 이 테스트가 실패한다.
import { describe, it, expect } from "vitest";
import { createPerfCounters } from "./perf";
import { registerCommands, registerTerminal, unregisterTerminal } from "./commands";
import type { PluginContext } from "./host";
import type { TerminalInstance } from "./terminal";

describe("perf counters (순수 가산 — 폴링 0)", () => {
  it("바이트/ACK/write 콜백 지연/프레임을 정수 가산하고 스냅샷으로 노출한다", () => {
    const c = createPerfCounters();
    c.addBytes(5000);
    c.addBytes(1234);
    c.ackSent();
    c.addWriteCbLag(3.7);
    c.addWriteCbLag(1.3);
    c.frame();
    c.frame();
    c.frame();
    const s = c.snapshot({ webglActive: true, scrollbackRows: 42 });
    expect(s).toEqual({
      writtenBytes: 6234,
      ackSent: 1,
      writeCbLagMs: 5, // 3.7+1.3 반올림(정수 보고)
      rafFrameCount: 3,
      webglActive: true,
      scrollbackRows: 42,
    });
  });

  it("초기 스냅샷은 전부 0", () => {
    const s = createPerfCounters().snapshot({ webglActive: false, scrollbackRows: 0 });
    expect(s).toEqual({
      writtenBytes: 0,
      ackSent: 0,
      writeCbLagMs: 0,
      rafFrameCount: 0,
      webglActive: false,
      scrollbackRows: 0,
    });
  });
});

// 커맨드 등록 캡처용 가짜 PluginContext.
function fakeCtx() {
  const registered = new Map<
    string,
    { handler: (p: Record<string, unknown>) => Promise<object> | object }
  >();
  const ctx = {
    app: {
      pluginId: "soksak-plugin-terminal",
      locale: () => "ko",
      commands: {
        register: (name: string, spec: { handler: (p: Record<string, unknown>) => Promise<object> | object }) => {
          registered.set(name, spec);
          return { dispose: () => registered.delete(name) };
        },
        execute: async () => ({ ok: true }),
      },
      events: { on: () => ({ dispose: () => {} }) },
      activity: { publish: () => {} },
      bus: { emit: () => {}, on: () => ({ dispose: () => {} }) },
      project: { current: () => null },
      settings: { get: () => undefined, all: () => ({}), onChange: () => ({ dispose: () => {} }) },
    },
    manifest: {},
    dir: "",
    subscriptions: [],
  } as unknown as PluginContext;
  return { ctx, registered };
}

describe("perf.stats / perf.echo 커맨드", () => {
  it("perf.stats 가 등록되고 뷰별 스냅샷 맵을 돌려준다", async () => {
    const { ctx, registered } = fakeCtx();
    registerCommands(ctx);
    expect([...registered.keys()]).toContain("perf.stats");

    const stats = {
      writtenBytes: 10,
      ackSent: 1,
      writeCbLagMs: 2,
      rafFrameCount: 3,
      webglActive: true,
      scrollbackRows: 4,
    };
    registerTerminal("v-test", {
      perfStats: () => stats,
    } as unknown as TerminalInstance);
    try {
      const r = (await registered.get("perf.stats")!.handler({})) as {
        ok: boolean;
        views: Record<string, unknown>;
      };
      expect(r.ok).toBe(true);
      expect(r.views["v-test"]).toEqual(stats);
    } finally {
      unregisterTerminal("v-test");
    }
  });

  it("perf.echo 가 등록되고 대상 터미널의 echoProbe 왕복(ms)을 돌려준다", async () => {
    const { ctx, registered } = fakeCtx();
    registerCommands(ctx);
    expect([...registered.keys()]).toContain("perf.echo");

    registerTerminal("v-echo", {
      echoProbe: async () => 7.25,
    } as unknown as TerminalInstance);
    try {
      const r = (await registered.get("perf.echo")!.handler({})) as {
        ok: boolean;
        viewId: string;
        roundtripMs: number;
      };
      expect(r.ok).toBe(true);
      expect(r.viewId).toBe("v-echo");
      expect(r.roundtripMs).toBe(7.25);
    } finally {
      unregisterTerminal("v-echo");
    }
  });

  it("터미널이 없으면 NO_TARGET", async () => {
    const { ctx, registered } = fakeCtx();
    registerCommands(ctx);
    const r = (await registered.get("perf.stats")!.handler({})) as { ok: boolean; code?: string };
    // perf.stats 는 빈 맵이 정상(뷰 0개도 유효 관측) — echo 는 대상이 필요하다.
    expect(r.ok).toBe(true);
    const e = (await registered.get("perf.echo")!.handler({})) as { ok: boolean; code?: string };
    expect(e.ok).toBe(false);
    expect(e.code).toBe("NO_TARGET");
  });
});

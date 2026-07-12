import { describe, it, expect, vi } from "vitest";
import { orchestrateRestore, ensureSidecar, ensureSession } from "./restore";
import type { PluginApi } from "./host";

// base64 of a tiny ANSI marker so the paint carries something recognizable.
const paintB64 = (s: string) => btoa(s);

interface Stubs {
  rehydrate?: () => unknown; // throw = sidecar down; return reply envelope
  sealed?: unknown | null | (() => never);
}

function fakeApp(stubs: Stubs) {
  const published: Array<{ kind: string; message: string }> = [];
  const spawned: string[] = [];
  const app = {
    locale: () => "ko",
    activity: {
      publish: (kind: string, entry: { message: string }) =>
        published.push({ kind, message: entry.message }),
    },
    process: {
      spawn: async (cmd: string) => {
        spawned.push(cmd);
        return 1;
      },
    },
    pty: {
      sidecarRequest: async (req: Record<string, unknown>) => {
        if (req.op === "rehydrate") {
          if (!stubs.rehydrate) return { ok: false, code: "NOT_FOUND" };
          return stubs.rehydrate();
        }
        return { ok: true, code: "OK", data: {} };
      },
      readSealedScreen: async () => {
        if (typeof stubs.sealed === "function") return (stubs.sealed as () => never)();
        return (stubs.sealed ?? null) as { paintB64: string; altActive: boolean } | null;
      },
    },
  } as unknown as PluginApi;
  return { app, published, spawned };
}

describe("orchestrateRestore", () => {
  it("warm: rehydrate paints inert and attaches from uptoSeq", async () => {
    const { app } = fakeApp({
      rehydrate: () => ({
        ok: true,
        code: "OK",
        data: { paint: paintB64("WARM-SCREEN"), uptoSeq: 4096, altActive: false },
      }),
    });
    const writes: string[] = [];
    const out = await orchestrateRestore(app, "v1", (d) => writes.push(bytesToStr(d)));
    expect(out.painted).toBe(true);
    expect(out.replay).toEqual({ fromSeq: 4096 });
    expect(writes.join("")).toContain("WARM-SCREEN");
  });

  it("cold: no live mirror but a sealed blob → paint + loss notice, replay none", async () => {
    const { app } = fakeApp({
      // rehydrate undefined → NOT_FOUND
      sealed: { paintB64: paintB64("COLD-SCREEN"), altActive: false },
    });
    const writes: string[] = [];
    const out = await orchestrateRestore(app, "v1", (d) => writes.push(bytesToStr(d)));
    expect(out.replay).toBe("none");
    expect(out.painted).toBe(true);
    const all = writes.join("");
    expect(all).toContain("COLD-SCREEN");
    expect(all).toContain("복원"); // 소실 고지가 화면에 찍힌다(무음 금지)
  });

  it("fresh: no mirror and no blob → replay none, floor draws", async () => {
    const { app } = fakeApp({ sealed: null });
    const out = await orchestrateRestore(app, "v1", () => {});
    expect(out.replay).toBe("none"); // 스폰은 항상 명시(코어 폴백 없음)
    expect(out.painted).toBe(false); // floor 가 이력 바닥을 깐다
  });

  it("degraded: a dead sidecar is announced loudly, respawned, and falls to the seal path", async () => {
    const { app, published, spawned } = fakeApp({
      rehydrate: () => {
        throw new Error("no terminal sidecar");
      },
      sealed: { paintB64: paintB64("COLD-VIA-FALLBACK"), altActive: false },
    });
    const writes: string[] = [];
    const out = await orchestrateRestore(app, "v1", (d) => writes.push(bytesToStr(d)));
    expect(published.some((p) => p.kind === "terminal.restore.degraded")).toBe(true);
    expect(spawned).toContain("sidecar:terminal-alacritty"); // 리스폰
    expect(out.painted).toBe(true);
    expect(out.replay).toBe("none");
    expect(writes.join("")).toContain("COLD-VIA-FALLBACK");
  });

  it("degraded with no blob → loud degraded-fresh notice, fresh shell (no core fallback)", async () => {
    const { app, published } = fakeApp({
      rehydrate: () => {
        throw new Error("down");
      },
      sealed: null,
    });
    const writes: string[] = [];
    const out = await orchestrateRestore(app, "v1", (d) => writes.push(bytesToStr(d)));
    // 코어 폴백 없이 신선 셸 — 무음 금지: 화면 + 활동에 고지.
    expect(out.replay).toBe("none");
    expect(out.painted).toBe(false); // floor 가 이력 바닥을 깐다
    expect(published.some((p) => p.kind === "terminal.restore.degraded-fresh")).toBe(true);
    expect(writes.join("")).toContain("복원 서비스 미가동"); // 화면에도 loud
  });
});

describe("ensureSession", () => {
  it("retries until the sidecar subscribes (survives an async sidecar spawn)", async () => {
    let calls = 0;
    const app = {
      locale: () => "ko",
      activity: { publish: () => {} },
      pty: {
        sidecarRequest: async (req: Record<string, unknown>) => {
          expect(req.op).toBe("ensureSession");
          calls++;
          if (calls < 3) throw new Error("no terminal sidecar"); // 아직 안 뜸
          return { ok: true, code: "OK", data: { subscribed: true } };
        },
      },
    } as unknown as PluginApi;
    await ensureSession(app, "v1", 80, 24);
    expect(calls).toBe(3); // 두 번 실패 후 세 번째에 구독 성공
  });

  it("gives up loudly after the bound instead of silently", async () => {
    const published: string[] = [];
    const app = {
      locale: () => "ko",
      activity: { publish: (kind: string) => published.push(kind) },
      pty: {
        sidecarRequest: async () => {
          throw new Error("down");
        },
      },
    } as unknown as PluginApi;
    // deadline 을 짧게: Date.now 를 진행시켜 유계 초과를 강제한다.
    const realNow = Date.now;
    let t = realNow();
    vi.spyOn(Date, "now").mockImplementation(() => (t += 3000)); // 매 호출마다 3s 전진
    await ensureSession(app, "v1", 80, 24);
    Date.now = realNow;
    expect(published).toContain("terminal.sidecar.subscribe-timeout");
  });
});

describe("ensureSidecar", () => {
  it("spawns the survival sidecar detached", async () => {
    const spawn = vi.fn(async () => 1);
    const app = {
      locale: () => "ko",
      activity: { publish: () => {} },
      process: { spawn },
    } as unknown as PluginApi;
    ensureSidecar(app);
    expect(spawn).toHaveBeenCalledWith("sidecar:terminal-alacritty", [], { detached: true });
  });
});

function bytesToStr(d: string | Uint8Array): string {
  return typeof d === "string" ? d : new TextDecoder().decode(d);
}

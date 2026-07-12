import { describe, it, expect, vi } from "vitest";
import { orchestrateRestore, ensureSidecar } from "./restore";
import type { PluginApi } from "./host";

// base64 of a tiny ANSI marker so the paint carries something recognizable.
const paintB64 = (s: string) => btoa(s);

interface Stubs {
  rehydrate?: () => unknown; // throw = sidecar down; return reply envelope
  sealed?: unknown | null | (() => never);
  screenRestored?: boolean;
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
      wasScreenRestored: () => stubs.screenRestored ?? false,
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

  it("fresh: no mirror and no blob → default replay, floor draws", async () => {
    const { app } = fakeApp({ sealed: null });
    const out = await orchestrateRestore(app, "v1", () => {});
    expect(out.replay).toBeUndefined();
    expect(out.painted).toBe(false);
    expect(out.deferToCoreRestore).toBeFalsy();
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

  it("degraded with no blob → defers painted to the core restore signal", async () => {
    const { app } = fakeApp({
      rehydrate: () => {
        throw new Error("down");
      },
      sealed: null,
    });
    const out = await orchestrateRestore(app, "v1", () => {});
    expect(out.deferToCoreRestore).toBe(true);
    expect(out.replay).toBeUndefined();
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

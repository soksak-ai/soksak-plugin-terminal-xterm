// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { activate, type TerminalHost } from "./activate";

vi.stubGlobal("matchMedia", () => ({
  matches: false,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
}));
vi.stubGlobal("ResizeObserver", class {
  observe() {}
  unobserve() {}
  disconnect() {}
});

type CommandHandler = (
  params: Record<string, unknown>,
  context?: { pane?: string },
) => Promise<Record<string, unknown>> | Record<string, unknown>;

describe("renderer benchmark command", () => {
  it("measures a named mounted screen and returns machine-readable samples", async () => {
    let provider: { mount(container: HTMLElement, context: unknown): void } | null = null;
    const commands = new Map<string, { handler: CommandHandler }>();
    const host: TerminalHost = {
      ui: {
        registerView: (_id, registered) => {
          provider = registered;
          return { dispose() {} };
        },
      },
      commands: {
        register: (name, spec) => {
          commands.set(name, spec as { handler: CommandHandler });
          return { dispose() {} };
        },
      },
      locale: () => "en",
      pty: {
        spawn: async () => 1,
        write: async () => {},
        resize: async () => {},
        close: async () => {},
        onData: () => ({ dispose() {} }),
        registerIo: () => ({ dispose() {} }),
        paneAlive: async () => false,
        sidecarRequest: async () => ({ ok: true, data: {} }),
      },
    };
    activate({ app: host, subscriptions: [] });
    const container = document.createElement("div");
    Object.defineProperty(container, "clientWidth", { value: 800 });
    Object.defineProperty(container, "clientHeight", { value: 600 });
    document.body.append(container);
    provider!.mount(container, { viewId: "tab-benchmark", setStatus() {} });
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const command = commands.get("benchmark.parser");
    expect(command).toBeDefined();
    const result = await command!.handler({
      view: "tab-benchmark",
      mode: "printable",
      bytes: 2048,
      repetitions: 2,
    });

    expect(result).toMatchObject({
      engine: "xterm",
      view: "tab-benchmark",
      mode: "printable",
      bytesPerSample: 2048,
      repetitions: 2,
      totalBytes: 4096,
    });
    expect(result.samplesMs).toHaveLength(2);
  });

  it("refuses invalid workload bounds before touching a screen", async () => {
    const commands = new Map<string, { handler: CommandHandler }>();
    const host = {
      ui: { registerView: () => ({ dispose() {} }) },
      commands: {
        register: (name: string, spec: Record<string, unknown>) => {
          commands.set(name, spec as { handler: CommandHandler });
          return { dispose() {} };
        },
      },
      locale: () => "en",
      pty: {},
    } as unknown as TerminalHost;
    activate({ app: host, subscriptions: [] });

    const result = await commands.get("benchmark.parser")!.handler({
      mode: "printable",
      bytes: 0,
      repetitions: 2,
    });
    expect(result).toMatchObject({ ok: false, code: "INVALID_PARAMS" });
  });
});

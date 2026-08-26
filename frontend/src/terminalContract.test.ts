// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { activate, type TerminalHost } from "./activate";
import { TERMINAL_PLUGIN_COMMAND_SCHEMAS } from "@soksak/soksak-contract-plugin-terminal";

vi.stubGlobal("matchMedia", () => ({
  matches: false, addEventListener() {}, removeEventListener() {},
  addListener() {}, removeListener() {},
}));
vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });

type Handler = (
  params: Record<string, unknown>,
  context?: { pane?: string },
) => Promise<Record<string, unknown>> | Record<string, unknown>;

describe("terminal plugin behavior contract", () => {
  it("publishes status, recovery status, focus, and operable nodes", async () => {
    let provider: { mount(container: HTMLElement, context: unknown): void } | null = null;
    const commands = new Map<string, Handler>();
    const commandSpecs = new Map<string, Record<string, unknown>>();
    const restoreOpens: Array<Record<string, unknown> | undefined> = [];
    let emit: ((bytes: Uint8Array) => void) | undefined;
    const host: TerminalHost = {
      ui: { registerView: (_id, value) => { provider = value; return { dispose() {} }; } },
      commands: {
        register: (name, spec) => {
          commandSpecs.set(name, spec);
          commands.set(name, (spec as { handler: Handler }).handler);
          return { dispose() {} };
        },
        execute: async () => ({ data: { loginShell: "/bin/zsh" } }),
      },
      locale: () => "en",
      windowLabel: () => "win-test",
      secrets: { generate: vi.fn(async () => ({ created: true })) },
      sidecar: {
        open: async (name, opts) => {
          if (name !== "soksak-sidecar-pty") restoreOpens.push(opts);
          return name === "soksak-sidecar-pty" ? ({
          send: async (request) => ({
            id: "reply", ok: true, result: { code: "OK", data:
              request.command === "pty.pane"
                ? { held: false }
                : { session: 1, created: true, startSeq: 0 },
            },
          }),
          stream: async (_request, handlers) => {
            emit = handlers.onBytes;
            return {
            answer: { id: "reply", ok: true, result: { code: "OK", data: { startSeq: 0 } } },
            close: { dispose() {}, settled: Promise.resolve() },
            };
          },
          close: async () => {},
        }) : ({
          send: async (request) => ({
            ...(request.command === "terminal.archived"
              ? { id: "reply", ok: false, error: "no checkpoint", result: { code: "NOT_FOUND", data: null } }
              : {
            id: "reply",
            ok: true,
            result: {
              code: "OK",
              data: request.command === "terminal.prepareSession"
                ? { observerToken: "observer-contract" }
                : {},
            },
              }),
          }),
          stream: async () => ({ answer: {}, close: { dispose() {}, settled: Promise.resolve() } }),
          close: async () => {},
        });
        },
      },
    };
    activate({ app: host, subscriptions: [] });

    const container = document.createElement("div");
    Object.defineProperty(container, "clientWidth", { value: 800 });
    Object.defineProperty(container, "clientHeight", { value: 600 });
    document.body.append(container);
    let resolveLive!: () => void;
    const live = new Promise<void>((resolve) => { resolveLive = resolve; });
    container.addEventListener("soksak:terminal-status", (event) => {
      const status = (event as CustomEvent<{ phase: string }>).detail;
      if (status.phase === "live") resolveLive();
    });
    provider!.mount(container, {
      viewId: "tab-contract",
      setStatus() {},
    });
    await live;
    expect(restoreOpens).toContainEqual({
      generatedSecretEnv: {
        SOKSAK_TERMINAL_CHECKPOINT_KEY: { key: "terminal-checkpoint-key-v1", bytes: 32 },
      },
    });

    expect(commands.has("status")).toBe(true);
    expect(commands.has("recovery-status")).toBe(true);
    expect(commands.has("focus")).toBe(true);
    expect(Object.keys(commandSpecs.get("wait")!.params as Record<string, unknown>).sort())
      .toEqual(Object.keys(TERMINAL_PLUGIN_COMMAND_SCHEMAS.wait.input.properties).sort());

    const status = await commands.get("status")!({ view: "tab-contract" });
    expect(status).toMatchObject({
      pluginId: "soksak-plugin-terminal-xterm",
      engineId: "alacritty",
      rendererId: "xterm",
      phase: "live",
      recoveryOutcome: "fresh",
      fidelity: "complete",
      hostPixels: { width: 800, height: 600 },
      requested: expect.objectContaining({ cols: expect.any(Number), rows: expect.any(Number) }),
      pty: null, recovery: null,
      rendered: null,
      operation: expect.any(String),
    });
    emit!(new Uint8Array([65]));
    await vi.waitFor(async () => {
      const progressed = await commands.get("status")!({ view: "tab-contract" });
      expect(progressed.rendered).toEqual(expect.objectContaining({
        cols: expect.any(Number), rows: expect.any(Number), outputSequence: 1,
      }));
    });
    expect(status).not.toHaveProperty("source");
    expect(status).not.toHaveProperty("cols");
    expect(await commands.get("recovery-status")!({ view: "tab-contract" }))
      .toMatchObject({ phase: "live", recoveryOutcome: "fresh", fidelity: "complete" });
    expect(await commands.get("focus")!({ view: "tab-contract" }))
      .toMatchObject({ focused: true });
    // The view owns terminal-root; every pane node carries that pane's suffix.
    expect(document.activeElement).toBe(
      container.querySelector('[data-node="terminal-input/1"]'),
    );
    expect(container.dataset.node).toBe("terminal-root");
    expect(container.querySelector('[data-node="terminal-screen/1"]')).not.toBeNull();
    expect(container.querySelector('[data-node="terminal-restore-status/1"]')).not.toBeNull();
    expect(container.dataset.paneCount).toBe("1");
  });
});

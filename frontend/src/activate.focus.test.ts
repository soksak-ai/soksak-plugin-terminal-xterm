// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { activate, type TerminalHost } from "./activate";

vi.stubGlobal("matchMedia", () => ({
  matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
}));
vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });

describe("terminal view focus boundary", () => {
  it("wires host focus transfer to the mounted screen's canonical input", () => {
    let provider: {
      mount(container: HTMLElement, context: unknown): void;
      prepareFocusTransfer?(container: HTMLElement, context: unknown): void;
      focus?(container: HTMLElement, context: unknown, request: { signal: AbortSignal }): void;
    } | null = null;
    const host: TerminalHost = {
      ui: {
        registerView: (_id, registered) => { provider = registered; return { dispose() {} }; },
      },
      commands: { register: () => ({ dispose() {} }) },
      locale: () => "en",
      windowLabel: () => "win-test",
      sidecar: {
        open: async () => ({
          send: async () => ({ ok: true, result: { code: "OK", data: { session: 1, held: false } } }),
          stream: async () => ({ answer: { ok: true }, close: { dispose() {}, settled: Promise.resolve() } }),
          close: async () => {},
        }),
      },
    };
    activate({ app: host, subscriptions: [] });
    expect(provider).not.toBeNull();
    const container = document.createElement("div");
    Object.defineProperty(container, "clientWidth", { value: 800 });
    Object.defineProperty(container, "clientHeight", { value: 600 });
    document.body.append(container);
    provider!.mount(container, { viewId: "tab-a", paneId: "pan-a", setStatus() {} });

    const controller = new AbortController();
    provider!.focus?.(container, {}, { signal: controller.signal });
    expect(document.activeElement).toBe(container.querySelector('[data-node="terminal-input"]'));
    provider!.prepareFocusTransfer?.(container, {});
    expect(container.contains(document.activeElement)).toBe(false);
  });
});

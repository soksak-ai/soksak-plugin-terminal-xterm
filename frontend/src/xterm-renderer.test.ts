// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { createXtermPresenter } from "./xterm-renderer";

vi.stubGlobal("matchMedia", () => ({
  matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
}));

function mounted(): HTMLElement {
  const container = document.createElement("div");
  Object.defineProperty(container, "clientWidth", { value: 800 });
  Object.defineProperty(container, "clientHeight", { value: 600 });
  document.body.append(container);
  return container;
}

describe("Xterm renderer adapter", () => {
  it("applies recovery paint and later PTY bytes to the same screen", async () => {
    const presenter = createXtermPresenter(mounted(), vi.fn());
    await presenter.applySnapshot!({ paint: btoa("RESTORED") }, false);
    presenter.writeOutput!(new TextEncoder().encode(" LIVE"));
    await vi.waitFor(() => expect(presenter.read()).toContain("RESTORED LIVE"));
    presenter.dispose();
  });

  it("owns only renderer focus, IME input, and benchmark behavior", async () => {
    const send = vi.fn();
    const container = mounted();
    const presenter = createXtermPresenter(container, send);
    expect(presenter.focus()).toBe(true);
    expect(document.activeElement).toBe(container.querySelector('[data-node="terminal-input"]'));
    presenter.prepareFocusTransfer?.();
    expect(container.contains(document.activeElement)).toBe(false);
    const result = await presenter.benchmark({ mode: "printable", bytes: 1024, repetitions: 2 });
    expect(result).toMatchObject({ engine: "xterm", totalBytes: 2048 });
    expect(send).not.toHaveBeenCalled();
    presenter.dispose();
  });
});

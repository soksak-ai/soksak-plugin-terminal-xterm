// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { createTerminalTextWait, createXtermPresenter } from "./xterm-renderer";

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
  it("waits on parser completion when rendering is suspended", async () => {
    let parsed: (() => void) | undefined;
    let text = "";
    const wait = createTerminalTextWait(
      () => text,
      (callback) => { parsed = callback; return { dispose() {} }; },
    );
    const found = wait("TAIL", 100);
    text = "262144 bytes TAIL";
    parsed!();
    await expect(found).resolves.toBe(text);
  });

  it("observes restored text through the same parser boundary", async () => {
    const presenter = createXtermPresenter(mounted(), vi.fn());
    const found = presenter.waitForText("RESTORED", 100);
    await presenter.applySnapshot!({ paint: btoa("RESTORED") }, false);
    await expect(found).resolves.toContain("RESTORED");
    presenter.dispose();
  });

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

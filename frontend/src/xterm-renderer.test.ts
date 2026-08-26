// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import {
  createCoalescedXtermWriter,
  createTerminalTextWait,
  createXtermRenderWorkMeasurement,
  createXtermPresenter,
} from "./xterm-renderer";

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
  it("uses the kit-owned public terminal theme surface", () => {
    const presenter = createXtermPresenter(mounted(), vi.fn());
    const screen = presenter.root.querySelector<HTMLElement>('[data-node="terminal-screen"]')!;
    expect(screen.style.color).toBe("var(--fg)");
    expect(screen.style.backgroundColor).toBe("var(--card)");
    expect(screen.style.getPropertyValue("--soksak-terminal-cursor")).toBe("var(--acc)");
    expect(screen.style.getPropertyValue("--soksak-terminal-cursor-accent")).toBe("var(--card)");
    expect(screen.style.getPropertyValue("--soksak-terminal-selection-background")).toBe("var(--fg3)");
    expect(document.getElementById("soksak-plugin-terminal-xterm-style")?.textContent).not.toContain("var(--bg");
    presenter.dispose();
  });

  it("coalesces a daemon burst behind the in-flight parser write", () => {
    const writes: Array<{ bytes: Uint8Array; parsed: () => void }> = [];
    const completed = vi.fn();
    const writer = createCoalescedXtermWriter((bytes, parsed) => { writes.push({ bytes, parsed }); }, completed);

    writer.write(new Uint8Array([1]));
    for (let value = 2; value <= 978; value += 1) writer.write(new Uint8Array([value & 0xff]));

    expect(writes).toHaveLength(1);
    writes[0].parsed();
    expect(writes).toHaveLength(2);
    expect(writes[1].bytes).toHaveLength(977);
    expect([...writes[1].bytes.slice(0, 3)]).toEqual([2, 3, 4]);
    writes[1].parsed();
    expect(completed).toHaveBeenCalledTimes(2);
  });

  it("resolves a queued snapshot only after its own parser write", async () => {
    const writes: Array<{ parsed: () => void }> = [];
    const writer = createCoalescedXtermWriter((_bytes, parsed) => { writes.push({ parsed }); }, vi.fn());
    writer.write(new Uint8Array([1]));
    let restored = false;
    const snapshot = writer.writeAndWait(new Uint8Array([2])).then(() => { restored = true; });
    writes[0].parsed();
    await Promise.resolve();
    expect(restored).toBe(false);
    writes[1].parsed();
    await snapshot;
    expect(restored).toBe(true);
  });

  it("reports live output completion only after Xterm parsed it", async () => {
    const writes: Array<{ parsed: () => void }> = [];
    const writer = createCoalescedXtermWriter((_bytes, parsed) => { writes.push({ parsed }); }, vi.fn());
    let applied = false;
    const live = writer.writeAndWait(new Uint8Array([1])).then(() => { applied = true; });
    await Promise.resolve();
    expect(applied).toBe(false);
    writes[0].parsed();
    await live;
    expect(applied).toBe(true);
  });

  it("measures active render preparation without display callback wait", () => {
    let now = 0;
    const frames: Array<() => void> = [];
    const measurement = createXtermRenderWorkMeasurement(
      (callback: () => void) => { frames.push(callback); return () => undefined; },
      () => now,
    );
    const first = measurement.begin();
    now = 2;
    first();
    now = 16;
    frames.shift()!();
    now = 18;
    expect(measurement.takeRendered()).toBe(2);
    expect(measurement.takeRendered()).toBeNull();
    measurement.dispose();
  });

  it("publishes the real Xterm render event separately from parser completion", async () => {
    const presenter = createXtermPresenter(mounted(), vi.fn());
    const samples: number[] = [];
    expect(presenter.onRendered).toBeTypeOf("function");
    const rendered = presenter.onRendered!((durationMs) => { samples.push(durationMs); });
    await presenter.writeOutput!(new TextEncoder().encode("VISIBLE"));
    await vi.waitFor(() => expect(samples.length).toBeGreaterThan(0));
    expect(samples.every((sample) => Number.isFinite(sample) && sample >= 0)).toBe(true);
    rendered.dispose();
    presenter.dispose();
  });

  it("parses a 978-chunk daemon burst through the real Xterm buffer", async () => {
    const presenter = createXtermPresenter(mounted(), vi.fn());
    const tail = "SOKSAK_HIGH_OUTPUT_TAIL";
    const found = presenter.waitForText(tail, 2000);
    for (let index = 0; index < 977; index += 1) {
      presenter.writeOutput!(new TextEncoder().encode(`line-${index.toString().padStart(4, "0")}\r\n`));
    }
    presenter.writeOutput!(new TextEncoder().encode(tail));
    await expect(found).resolves.toContain(tail);
    expect(presenter.read()).toContain(tail);
    presenter.dispose();
  });

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

  it("publishes cursor visibility, position, and active focus from Xterm", async () => {
    const presenter = createXtermPresenter(mounted(), vi.fn());
    const screen = presenter.root.querySelector<HTMLElement>('[data-node="terminal-screen"]')!;
    await presenter.writeOutput!(new TextEncoder().encode("A\x1b[?25l"));
    expect(screen.dataset.cursorVisible).toBe("false");
    expect(screen.dataset.cursorRow).toBe("0");
    expect(screen.dataset.cursorColumn).toBe("1");
    presenter.focus();
    expect(screen.dataset.cursorActive).toBe("false");
    await presenter.writeOutput!(new TextEncoder().encode("\x1b[?25h"));
    expect(screen.dataset.cursorVisible).toBe("true");
    expect(screen.dataset.cursorActive).toBe("true");
    presenter.dispose();
  });

  it("accepts unconsumed public DOM text and special-key events exactly once", async () => {
    const send = vi.fn();
    const presenter = createXtermPresenter(mounted(), send);
    const input = presenter.root.querySelector<HTMLTextAreaElement>('[data-node="terminal-input"]')!;
    input.value = "x";
    input.dispatchEvent(new InputEvent("input", {
      bubbles: true, inputType: "insertText", data: "x",
    }));
    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "y" }));
    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Enter" }));
    await vi.waitFor(() => expect(send.mock.calls.map((call) => call[0])).toEqual(["x", "y", "\r"]));
    presenter.dispose();
  });
});

// A composition's intermediate states are what the person is still typing; only the committed text
// is input. A caller with no keyboard drives the same events the keyboard would.
describe("a driven composition", () => {
  it("emits the committed text once and reports it", async () => {
    const sent: string[] = [];
    const container = document.createElement("div");
    document.body.append(container);
    const presenter = createXtermPresenter(container, (data) => sent.push(data), "1");
    const emitted = presenter.compose!(["ㅎ", "하", "한"], "한");
    expect(emitted).toBe(1);
    await Promise.resolve();
    await Promise.resolve();
    expect(sent).toEqual(["한"]);
    presenter.dispose();
  });
});

// The pane clips what it paints. A pane that lets its content run past its box makes an ancestor
// scroll, and what scrolls out of view is the screen the reader came for.
describe("the pane box", () => {
  it("clips its content and positions inside itself", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const presenter = createXtermPresenter(container, () => {}, "1");
    expect(container.style.overflow).toBe("hidden");
    expect(container.style.position).toBe("relative");
    presenter.dispose();
  });
});

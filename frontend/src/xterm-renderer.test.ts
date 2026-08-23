// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { createCoalescedXtermWriter, createTerminalTextWait, createXtermPresenter } from "./xterm-renderer";

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
});

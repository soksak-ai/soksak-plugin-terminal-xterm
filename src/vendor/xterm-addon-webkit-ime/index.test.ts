import { describe, expect, it } from "vitest";
import {
  WebkitImeAddon,
  type ITerminalLike,
} from "./index";

class FakeElement extends EventTarget {
  style: Record<string, string> = {};
  parentElement: FakeElement | null = null;
  children: FakeElement[] = [];

  appendChild(child: FakeElement): FakeElement {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  remove(): void {}
}

class FakeCompositionEvent extends Event {
  readonly data: string;

  constructor(type: string, init: { data?: string; bubbles?: boolean } = {}) {
    super(type, { bubbles: init.bubbles });
    this.data = init.data ?? "";
  }
}

function harness() {
  const body = new FakeElement();
  const terminalElement = new FakeElement();
  const textarea = new FakeElement();
  terminalElement.appendChild(textarea);
  const sent: string[] = [];
  const documentStub = {
    body,
    createElement: () => new FakeElement(),
  };
  const previousDocument = globalThis.document;
  const previousCompositionEvent = globalThis.CompositionEvent;
  Object.assign(globalThis, {
    document: documentStub,
    CompositionEvent: FakeCompositionEvent,
  });

  // xterm's CompositionHelper owns the standard compositionend path and is
  // registered before the addon.
  textarea.addEventListener("compositionend", (event) => {
    sent.push((event as FakeCompositionEvent).data);
  });
  const terminal = {
    textarea,
    element: terminalElement,
    cols: 80,
    rows: 24,
    options: {},
    buffer: { active: { cursorX: 0, cursorY: 0 } },
    onRender: () => ({ dispose: () => {} }),
    attachCustomKeyEventHandler: () => {},
  } as unknown as ITerminalLike;
  const addon = new WebkitImeAddon({ onData: (data) => sent.push(data) });
  addon.activate(terminal);

  return {
    addon,
    textarea,
    sent,
    restore: () => {
      addon.dispose();
      Object.assign(globalThis, {
        document: previousDocument,
        CompositionEvent: previousCompositionEvent,
      });
    },
  };
}

describe("WebkitImeAddon focus transfer", () => {
  it("commits a standard composition exactly once before focus leaves", () => {
    const h = harness();
    try {
      h.textarea.dispatchEvent(new FakeCompositionEvent("compositionstart"));
      h.textarea.dispatchEvent(
        new FakeCompositionEvent("compositionupdate", { data: "한" }),
      );

      h.addon.prepareFocusTransfer();
      h.addon.prepareFocusTransfer();

      expect(h.sent).toEqual(["한"]);
    } finally {
      h.restore();
    }
  });

  it("flushes a non-standard pending syllable exactly once", () => {
    const h = harness();
    try {
      const input = new Event("input") as InputEvent;
      Object.defineProperties(input, {
        inputType: { value: "insertReplacementText" },
        data: { value: "한" },
      });
      h.textarea.dispatchEvent(input);

      h.addon.prepareFocusTransfer();
      h.addon.prepareFocusTransfer();

      expect(h.sent).toEqual(["한"]);
    } finally {
      h.restore();
    }
  });
});

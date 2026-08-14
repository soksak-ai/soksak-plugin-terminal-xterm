import { describe, expect, it } from "vitest";

import { attachTerminalInputTrace } from "./inputTrace";

describe("terminal IME event trace", () => {
  it("publishes the ordered browser event facts without changing the event", () => {
    const target = new EventTarget();
    const events: unknown[] = [];
    const dispose = attachTerminalInputTrace(
      target as HTMLTextAreaElement,
      (event) => events.push(event),
    );

    const before = new Event("beforeinput", { cancelable: true });
    Object.defineProperties(before, {
      data: { value: "ㅎ" },
      inputType: { value: "insertText" },
      isComposing: { value: true },
    });
    target.dispatchEvent(before);

    const input = new Event("input", { cancelable: true });
    Object.defineProperties(input, {
      data: { value: "한" },
      inputType: { value: "insertReplacementText" },
      isComposing: { value: true },
    });
    target.dispatchEvent(input);
    dispose();

    expect(events).toEqual([
      { kind: "beforeinput", data: "ㅎ", inputType: "insertText", isComposing: true },
      { kind: "input", data: "한", inputType: "insertReplacementText", isComposing: true },
    ]);
    expect(before.defaultPrevented).toBe(false);
    expect(input.defaultPrevented).toBe(false);
  });
});

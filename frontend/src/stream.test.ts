import { describe, expect, it } from "vitest";
import { terminalBytes } from "./stream";

describe("terminal byte stream", () => {
  it("passes arbitrary UTF-8 chunks to xterm without decoding them as strings", () => {
    const bytes = new TextEncoder().encode("경계 ── ✓");
    const chunks = [bytes.slice(0, 1), bytes.slice(1, 4), bytes.slice(4)];
    const joined = new Uint8Array(bytes.length);
    let offset = 0;
    for (const chunk of chunks) {
      const encoded = btoa(String.fromCharCode(...chunk));
      const decoded = terminalBytes(encoded);
      joined.set(decoded, offset);
      offset += decoded.length;
    }
    expect(joined).toEqual(bytes);
  });
});

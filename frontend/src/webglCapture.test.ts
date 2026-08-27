import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("WebGL capture", () => {
  it("preserves the rendered buffer for native snapshots", () => {
    const source = readFileSync(new URL("./xterm-renderer.ts", import.meta.url), "utf8");
    expect(source).toContain("new WebglAddon(true)");
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("WebGL renderer release", () => {
  it("bundles deterministic context teardown", () => {
    const bundle = readFileSync(new URL("../../main.js", import.meta.url), "utf8");
    expect(bundle).toContain("WEBGL_lose_context");
    expect(bundle).toContain("webgl");
  });
});

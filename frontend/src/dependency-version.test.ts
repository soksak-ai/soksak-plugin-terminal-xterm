import { describe, expect, it } from "vitest";

import manifest from "../package.json";

describe("Xterm runtime dependency", () => {
  it("uses the stable Xterm 6 API and its matching fit addon", () => {
    expect(manifest.dependencies["@xterm/xterm"]).toBe("6.0.0");
    expect(manifest.dependencies["@xterm/addon-fit"]).toBe("0.11.0");
  });
});

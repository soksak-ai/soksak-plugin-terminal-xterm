import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import manifest from "../package.json";

describe("Xterm runtime dependency", () => {
  it("uses the stable Xterm 6 API and its matching fit addon", () => {
    expect(manifest.dependencies["@xterm/xterm"]).toBe("6.0.0");
    expect(manifest.dependencies["@xterm/addon-fit"]).toBe("0.11.0");
  });

  it("consumes the independently owned IME library at one exact commit", () => {
    expect(manifest.dependencies["xterm-addon-webkit-ime"]).toMatch(
      /^github:min-median-max\/xterm-addon-webkit-ime#[a-f0-9]{40}$/,
    );
    const addonManifest = resolve(
      dirname(fileURLToPath(import.meta.url)),
      "../node_modules/xterm-addon-webkit-ime/package.json",
    );
    const addon = JSON.parse(readFileSync(addonManifest, "utf8"));
    expect(addon.engines?.node).toBe("26.7.0");
    expect(addon.packageManager).toBe("pnpm@11.22.0");
    expect(addon.peerDependencies).toEqual({ "@xterm/xterm": "6.0.0" });
  });
});

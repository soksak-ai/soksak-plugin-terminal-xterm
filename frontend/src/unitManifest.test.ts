import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const manifest = JSON.parse(readFileSync(new URL("../../soksak-unit.json", import.meta.url), "utf8"));

describe("plugin unit manifest", () => {
  it("declares this plugin and its exact runtime boundaries", () => {
    expect(manifest.id).toBe("soksak-plugin-terminal-xterm");
    expect(manifest.version).toBe("0.0.1");
    expect(manifest.dependencies).toContainEqual({ kind: "sidecar", id: "soksak-sidecar-pty", version: "0.0.1" });
    expect(manifest.dependencies).toContainEqual({ kind: "sidecar", id: "soksak-sidecar-terminal-vt100", version: "0.0.1" });
    expect(manifest.consumes.map((value: { name: string }) => value.name)).toEqual(["pty", "state"]);
    expect(manifest.entrypoints).toEqual([{ role: "plugin", path: "plugin.json" }]);
  });
});

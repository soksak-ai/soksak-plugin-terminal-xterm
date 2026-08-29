import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { TERMINAL_PLUGIN_CONTRACT, validateTerminalPluginManifestCommands } from "@soksak/soksak-contract-plugin-terminal";

describe("terminal plugin manifest contract", () => {
  it("declares every common terminal command and may add implementation commands", () => {
    const manifest = JSON.parse(readFileSync(new URL("../../plugin.json", import.meta.url), "utf8"));
    const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
    expect(manifest.id).toBe("soksak-plugin-terminal-xterm");
    expect(manifest.name).toEqual({ en: "Xterm.js Terminal", ko: "Xterm.js 터미널" });
    expect(manifest).not.toHaveProperty("spec");
    expect(manifest.appVersionRequirement).toBe("0.0.1");
    expect(manifest.implements).toEqual([TERMINAL_PLUGIN_CONTRACT]);
    // The engine is a user setting: every engine offered is a runtime dependency, alacritty is the default.
    const engines = ["alacritty", "ghostty", "kitty", "shitty", "vt100", "wezterm"];
    expect(manifest.runtimeDependencies.sidecars.map((sidecar: { id: string }) => sidecar.id)).toEqual(["soksak-sidecar-pty", ...engines.map((engine) => `soksak-sidecar-terminal-${engine}`)]);
    const engine = manifest.configuration.find((setting: { key: string }) => setting.key === "engine");
    expect(engine).toMatchObject({ type: "enum", enum: engines, default: "alacritty" });
    // A manifest dependency is intent: {id, version}. The release document carries the facts (size, sha256).
    for (const sidecar of manifest.runtimeDependencies.sidecars) expect(sidecar).toEqual({ id: expect.stringMatching(/^soksak-sidecar-[a-z0-9-]+$/), version: expect.stringMatching(/^(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)$/) });
    expect(manifest.runtimeDependencies.sidecars.find((sidecar: { id: string }) => sidecar.id === "soksak-sidecar-terminal-alacritty")?.version).toBe("0.0.37");
    expect(manifest.runtimeDependencies.sidecars.find((sidecar: { id: string }) => sidecar.id === "soksak-sidecar-terminal-ghostty")?.version).toBe("0.0.34");
    expect(manifest.runtimeDependencies.sidecars.find((sidecar: { id: string }) => sidecar.id === "soksak-sidecar-terminal-kitty")?.version).toBe("0.0.31");
    expect(manifest.runtimeDependencies.sidecars.find((sidecar: { id: string }) => sidecar.id === "soksak-sidecar-terminal-shitty")?.version).toBe("0.0.30");
    expect(pkg.dependencies["@soksak/soksak-contract-plugin-terminal"]).toBe("0.0.17");
    expect(pkg.dependencies["@soksak/soksak-kit-plugin-terminal"]).toBe("0.0.80");
    expect(validateTerminalPluginManifestCommands(manifest.contributes.commands)).toEqual([]);
  });
});

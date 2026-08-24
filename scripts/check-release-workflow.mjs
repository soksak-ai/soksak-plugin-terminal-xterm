#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflow = fs.readFileSync(path.join(root, ".github/workflows/release.yml"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "plugin.json"), "utf8"));
const pkg = JSON.parse(fs.readFileSync(path.join(root, "frontend/package.json"), "utf8"));
const nodeVersion = fs.readFileSync(path.join(root, ".node-version"), "utf8").trim();
const makefile = fs.readFileSync(path.join(root, "Makefile"), "utf8");
const preflight = fs.readFileSync(path.join(root, "scripts/check-build-environment.sh"), "utf8");
if (/pnpm_executable|pnpmExecutable/.test(preflight)) throw new Error("preflight must judge the effective repository-selected pnpm");
const requireText = (value, label) => { if (!workflow.includes(value)) throw new Error(`release workflow is missing ${label}: ${value}`); };
if (nodeVersion !== pkg.engines.node) throw new Error("Node owner file and package engine differ");
for (const target of ["preflight", "prepare", "build", "verify"]) if (!new RegExp(`^${target}:`, "m").test(makefile)) throw new Error(`Makefile target is missing: ${target}`);
if (typeof manifest.spec === "string" || "schema" in manifest) throw new Error("plugin manifest repeats schema metadata");
if (manifest.appVersionRequirement !== "0.0.1") throw new Error("plugin app version requirement must be exact 0.0.1");
if (!Array.isArray(manifest.runtimeDependencies?.sidecars) || manifest.runtimeDependencies.sidecars.length !== 2) throw new Error("terminal plugins require two exact Sidecar releases");
for (const sidecar of manifest.runtimeDependencies.sidecars) if (Object.keys(sidecar).sort().join(",") !== "id,sha256,size,url,version") throw new Error("Sidecar dependencies must use the common release reference");
if (!/^\d+\.\d+\.\d+$/.test(pkg.engines?.node ?? "") || !/^pnpm@\d+\.\d+\.\d+$/.test(pkg.packageManager ?? "")) throw new Error("release toolchain must be exact");
if ("pnpm" in pkg) throw new Error("pnpm 11 settings belong in pnpm-workspace.yaml");
for (const obsolete of ["release/dependencies.json", "release/source-dependencies.json"]) {
  if (fs.existsSync(path.join(root, obsolete))) throw new Error(`${obsolete} is obsolete`);
}
requireText("release-template/verify-plugin-release.mjs", "repeatable owner proof");
for (const value of ["spec_url:", "spec_sha256:", "${{ inputs.spec_url }}", "${{ inputs.spec_sha256 }}"]) requireText(value, "release-train input");
if (workflow.includes("repository: soksak-ai/soksak-spec") || workflow.includes("repository: min-median-max/xterm-addon-webkit-ime")) throw new Error("release workflow must not checkout dependency source");
requireText("release-template/publish-canonical-release.mjs", "canonical immutable publisher");
requireText("GH_TOKEN: ${{ steps.release-token.outputs.token }}", "GitHub CLI release token");
requireText("node-version-file: soksak-plugins/soksak-plugin-terminal-xterm/.node-version", "Node owner file");
requireText("package_json_file: soksak-plugins/soksak-plugin-terminal-xterm/frontend/package.json", "pnpm owner file");
if (workflow.includes("pnpm --dir frontend") || workflow.includes("gh release create")) throw new Error("workflow bypasses the owner command or canonical publisher");
console.log("plugin release workflow contract: passed");

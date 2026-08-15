// Bundles this plugin's entry into the file plugin.json names.
//
// The host imports one ESM module and calls activate on it. Everything the
// module needs is inlined: the host serves no module resolution for a plugin,
// so an unbundled import fails at load with no path to look in.
import { readFileSync } from "node:fs";
import { build } from "esbuild";

const manifest = JSON.parse(readFileSync(new URL("../plugin.json", import.meta.url), "utf8"));

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  // plugin.json names the file. Two names would let the build write one file
  // and the loader read another.
  // xterm CSS becomes a string so the whole plugin is one file. The host reads
  // the entry and nothing beside it.
  loader: { ".css": "text" },
  outfile: `../${manifest.entry}`,
  minify: false,
  legalComments: "none",
  logLevel: "info",
});

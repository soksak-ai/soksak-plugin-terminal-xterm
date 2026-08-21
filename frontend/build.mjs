// Bundles this plugin's entry into the file plugin.json names.
//
// The host imports one ESM module and calls activate on it. Everything the
// module needs is inlined: the host serves no module resolution for a plugin,
// so an unbundled import fails at load with no path to look in.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const manifest = JSON.parse(readFileSync(new URL("../plugin.json", import.meta.url), "utf8"));
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const kit = pkg.dependencies["@soksak/soksak-kit-plugin-terminal"];
if (!kit?.startsWith("file:")) throw new Error("terminal kit must be a declared file dependency");

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
  alias: {
    "@soksak/soksak-kit-plugin-terminal": fileURLToPath(
      new URL(`${kit.slice(5)}/src/index.ts`, import.meta.url),
    ),
  },
  outfile: `../${manifest.entry}`,
  minify: false,
  legalComments: "none",
  logLevel: "info",
});

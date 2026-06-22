// soksak-plugin-terminal 번들 빌드 — esbuild 단일 ESM main.js.
// xterm CSS 는 loader:text 로 문자열 import → styles.ts 에서 style 태그로 주입.
import { build, context } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(root, "src");

const opts = {
  entryPoints: ["src/plugin-entry.ts"],
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  alias: { "@": SRC },
  loader: {
    ".css": "text",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
    "import.meta.env.DEV": "false",
  },
  outfile: "main.js",
  minify: false,
  legalComments: "none",
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  const ctx = await context(opts);
  await ctx.watch();
  console.log("[terminal] watching src → main.js …");
} else {
  await build(opts);
  console.log("[terminal] built main.js");
}

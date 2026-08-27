import { readFile } from "node:fs/promises";

const teardown = /this\._canvas\.parentElement\?\.removeChild\(this\._canvas\),[$A-Za-z_][$\w]*\(this\._terminal\)/g;
const release = 'this._gl.getExtension("WEBGL_lose_context")?.loseContext()';

export function patchXtermWebglContextRelease(source) {
  if (source.includes("WEBGL_lose_context")) return source;
  const matches = [...source.matchAll(teardown)];
  if (matches.length !== 1) {
    throw new Error(`@xterm/addon-webgl teardown match count is ${matches.length}, expected 1`);
  }
  return source.replace(teardown, (matched) => `${matched},${release}`);
}

export function xtermWebglContextReleasePlugin() {
  return {
    name: "xterm-webgl-context-release",
    setup(build) {
      build.onLoad({ filter: /[/\\]@xterm[/\\]addon-webgl[/\\]lib[/\\]addon-webgl\.mjs$/ }, async (args) => ({
        contents: patchXtermWebglContextRelease(await readFile(args.path, "utf8")),
        loader: "js",
      }));
    },
  };
}

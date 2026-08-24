// This plugin's stylesheet, injected once as a single <style>.
//
// xterm's CSS arrives as a string: the build loads .css as text
// (frontend/build.mjs), so the whole plugin is one ESM file. The host imports
// one module and serves no second file for a plugin, so a stylesheet emitted
// beside the bundle would never be fetched.
//
// Selectors are this plugin's own. Host chrome selectors and host CSS variables
// are refused at activation (scanHostChromeViolations).
// @ts-expect-error — .css is bundled as text by build.mjs (loader: {".css": "text"})
import xtermCss from "@xterm/xterm/css/xterm.css";

const STYLE_ID = "soksak-plugin-terminal-xterm-style";

export function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const element = document.createElement("style");
  element.id = STYLE_ID;
  element.textContent = String(xtermCss);
  document.head.appendChild(element);
}

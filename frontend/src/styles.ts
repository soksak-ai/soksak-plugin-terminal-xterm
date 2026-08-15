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

const PLUGIN_CSS = `
.sk-term-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* The grid remainder at the right and bottom edges. It must equal the xterm
     theme background, or the pane shows two backgrounds. */
  background: var(--bg, #1e1e1e);
}
.sk-term-xterm {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.sk-term-xterm .xterm {
  width: 100%;
  height: 100%;
  padding: 0;
}
.sk-term-xterm .xterm .xterm-viewport {
  background-color: var(--bg, #1e1e1e) !important;
}
`;

export function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const element = document.createElement("style");
  element.id = STYLE_ID;
  element.textContent = String(xtermCss) + "\n" + PLUGIN_CSS;
  document.head.appendChild(element);
}

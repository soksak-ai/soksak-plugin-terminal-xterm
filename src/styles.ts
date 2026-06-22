// terminal 플러그인 전역 CSS — 단일 <style> 1회 주입.
// xterm CSS 는 esbuild loader:text 로 문자열로 번들된다.
// @ts-expect-error — .css 파일을 text 로 번들(build.mjs loader:{'.css':'text'})
import xtermCss from "@xterm/xterm/css/xterm.css";

export const XTERM_CSS: string = xtermCss as string;

export const PLUGIN_CSS = `
.sk-term-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #1e1e1e;
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
  background-color: #1e1e1e !important;
}
`;

export function injectStyles(): void {
  const STYLE_ID = "sk-terminal-style";
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = XTERM_CSS + "\n" + PLUGIN_CSS;
  document.head.appendChild(s);
}

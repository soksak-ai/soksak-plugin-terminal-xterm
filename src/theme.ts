// xterm 테마 — 앱 테마 계약(DOM)을 상속한다.
// 앱은 두 채널로 테마를 발행한다:
//   1) document.documentElement.dataset.themeMode = "dark"|"light"  (실효 모드)
//   2) :root 의 CSS 변수 --bg …  (색 토큰)
// 이 모듈은 그 계약을 읽어 xterm ITheme 를 만든다 — 코어 소스 비의존, 폴링 없음.
//
// 배경 규칙: xterm theme.background 는 *불투명* 색이어야
// 한다(투명+WebGL 은 그리드를 검정으로 렌더). 그리드 잔여(우/하단)는 CSS --bg 가 칠하므로
// theme.background 를 앱 --bg 와 동일하게 맞춘다 — 그래서 background 는 backgrounds[mode]
// 가 아니라 *실제* 계산된 --bg 를 우선 사용한다.
import type { ITheme } from "@xterm/xterm";

export type ThemeMode = "dark" | "light";

// 그리드 배경 폴백 — --bg 가 비었을 때만.
export const backgrounds: Record<ThemeMode, string> = {
  dark: "#1e1e1e",
  light: "#ffffff",
};

// 다크 — 16 ANSI + foreground/cursor/selection (VSCode Dark 계열).
const darkPalette: ITheme = {
  foreground: "#cccccc",
  background: backgrounds.dark,
  cursor: "#ffffff",
  cursorAccent: "#1e1e1e",
  selectionBackground: "#264f78",
  selectionInactiveBackground: "#3a3d41",
  black: "#000000",
  red: "#cd3131",
  green: "#0dbc79",
  yellow: "#e5e510",
  blue: "#2472c8",
  magenta: "#bc3fbc",
  cyan: "#11a8cd",
  white: "#e5e5e5",
  brightBlack: "#666666",
  brightRed: "#f14c4c",
  brightGreen: "#23d18b",
  brightYellow: "#f5f543",
  brightBlue: "#3b8eea",
  brightMagenta: "#d670d6",
  brightCyan: "#29b8db",
  brightWhite: "#ffffff",
};

// 라이트 — 흰 배경 가독 팔레트 (VSCode Light 계열).
const lightPalette: ITheme = {
  foreground: "#333333",
  background: backgrounds.light,
  cursor: "#000000",
  cursorAccent: "#ffffff",
  selectionBackground: "#add6ff",
  selectionInactiveBackground: "#e5ebf1",
  black: "#000000",
  red: "#cd3131",
  green: "#00bc00",
  yellow: "#949800",
  blue: "#0451a5",
  magenta: "#bc05bc",
  cyan: "#0598bc",
  white: "#555555",
  brightBlack: "#666666",
  brightRed: "#cd3131",
  brightGreen: "#14ce14",
  brightYellow: "#b5ba00",
  brightBlue: "#0451a5",
  brightMagenta: "#bc05bc",
  brightCyan: "#0598bc",
  brightWhite: "#a5a5a5",
};

const palettes: Record<ThemeMode, ITheme> = {
  dark: darkPalette,
  light: lightPalette,
};

// 앱이 발행한 실효 모드. 미설정(런타임 밖·테마 미적용)이면 "dark".
export function currentMode(): ThemeMode {
  const m =
    typeof document !== "undefined"
      ? document.documentElement.dataset.themeMode
      : undefined;
  return m === "light" ? "light" : "dark";
}

// 앱이 :root 에 발행한 배경 색(--bg). 코어 engine.ts 가 COLOR_SLOTS "bg" → "--bg" 로 매핑한다.
// 미설정/런타임 밖이면 빈 문자열.
function appBackground(): string {
  if (typeof document === "undefined" || typeof getComputedStyle !== "function") {
    return "";
  }
  return getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
}

// 모드 + 앱 배경 → xterm ITheme. background 는 앱 --bg(불투명) 우선, 비면 backgrounds[mode] 폴백.
export function themeFor(mode: ThemeMode = currentMode()): ITheme {
  const base = palettes[mode];
  const bg = appBackground() || backgrounds[mode];
  return { ...base, background: bg };
}

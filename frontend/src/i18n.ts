// This plugin's strings.
//
// A plugin owns its own translations. The host translates the host's surfaces,
// and a plugin that borrowed the host's table would break the first time the
// host renamed a key it never promised.
//
// The host supplies the display language through `app.locale()`; a language this
// table does not carry falls back to English.

export type Locale = "ko" | "en";

const MESSAGES = {
  "terminal.cleared": {
    en: "Cleared the terminal screen",
    ko: "터미널 화면을 지웠습니다",
  },
  "terminal.sent": {
    en: "Sent input to the terminal",
    ko: "터미널에 입력을 보냈습니다",
  },
  "terminal.noSession": {
    en: "This pane holds no terminal session yet",
    ko: "이 판에는 아직 터미널 세션이 없습니다",
  },
  "terminal.clear.description": {
    en: "Clear this terminal's screen. The shell keeps running.",
    ko: "이 터미널 화면을 지웁니다. 셸은 계속 실행됩니다.",
  },
  "terminal.send.description": {
    en: "Write text to this terminal as if it had been typed.",
    ko: "직접 입력한 것처럼 이 터미널에 텍스트를 씁니다.",
  },
  "terminal.label": {
    en: "Terminal",
    ko: "터미널",
  },
  "terminal.noSuchView": {
    en: "No terminal screen is open under that view id",
    ko: "그 뷰 id 로 열린 터미널 화면이 없습니다",
  },
  "terminal.ambiguous": {
    en: "Several terminal screens are open — name one with view",
    ko: "터미널 화면이 여러 개 열려 있습니다 — view 로 하나를 지정하세요",
  },
  "terminal.read.description": {
    en: "Read this terminal's screen and scrollback as text.",
    ko: "이 터미널의 화면과 스크롤백을 텍스트로 읽습니다.",
  },
  "terminal.read.answer": {
    en: "Read {n} characters",
    ko: "{n}자를 읽었습니다",
  },
  "terminal.exec.description": {
    en: "Run a command line in this terminal. Returns as soon as it is sent — read the output a moment later.",
    ko: "이 터미널에서 명령을 실행합니다. 보낸 직후 반환하므로 잠시 뒤 출력을 읽으세요.",
  },
  "terminal.exec.answer": {
    en: "Sent the command",
    ko: "명령을 보냈습니다",
  },
  "terminal.cwd.description": {
    en: "The working directory this terminal's shell last reported.",
    ko: "이 터미널의 셸이 마지막으로 보고한 작업 디렉터리입니다.",
  },
  "terminal.cwd.answer": {
    en: "Working directory {cwd}",
    ko: "작업 디렉터리 {cwd}",
  },
} as const;

export type MessageKey = keyof typeof MESSAGES;

/** The string for this key in the host's display language. */
export function t(key: MessageKey, locale: string): string {
  const entry = MESSAGES[key];
  return locale.startsWith("ko") ? entry.ko : entry.en;
}

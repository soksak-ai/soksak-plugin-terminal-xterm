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
} as const;

export type MessageKey = keyof typeof MESSAGES;

/** The string for this key in the host's display language. */
export function t(key: MessageKey, locale: string): string {
  const entry = MESSAGES[key];
  return locale.startsWith("ko") ? entry.ko : entry.en;
}

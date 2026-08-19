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
  "terminal.param.view": {
    en: "Target view id (omit = the caller's pane, or the only screen open)",
    ko: "대상 뷰 id (생략 = 호출자의 판, 또는 열려 있는 유일한 화면)",
  },
  "terminal.param.data": {
    en: "Text to write",
    ko: "쓸 텍스트",
  },
  "terminal.param.lines": {
    en: "Last N lines only (omit = the whole buffer)",
    ko: "마지막 N 줄만 (생략 = 버퍼 전체)",
  },
  "terminal.param.cmd": {
    en: "Command line to run",
    ko: "실행할 명령 줄",
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
  "terminal.benchmark.description": {
    en: "Measure this renderer's parser queue with a deterministic byte workload.",
    ko: "결정적 바이트 작업으로 이 렌더러의 파서 큐를 측정합니다.",
  },
  "terminal.benchmark.param.mode": {
    en: "Workload: printable or adversarial",
    ko: "작업 유형: printable 또는 adversarial",
  },
  "terminal.benchmark.param.bytes": {
    en: "Bytes per sample (1 to 16777216)",
    ko: "표본당 바이트 수(1~16777216)",
  },
  "terminal.benchmark.param.repetitions": {
    en: "Sample count (1 to 20)",
    ko: "표본 수(1~20)",
  },
  "terminal.benchmark.answer": {
    en: "Renderer parser throughput {throughput} MiB/s",
    ko: "렌더러 파서 처리량 {throughput} MiB/s",
  },
  "terminal.benchmark.invalid": {
    en: "mode must be printable or adversarial, bytes must be 1..16777216, and repetitions must be 1..20",
    ko: "mode는 printable 또는 adversarial, bytes는 1..16777216, repetitions는 1..20이어야 합니다.",
  },
} as const;

export type MessageKey = keyof typeof MESSAGES;

/** The string for this key in the host's display language. */
export function t(key: MessageKey, locale: string): string {
  const entry = MESSAGES[key];
  return locale.startsWith("ko") ? entry.ko : entry.en;
}

/**
 * The sentence itself, unresolved.
 *
 * A command's description and its answer are read by whoever called, and the host is the only one
 * that knows who that is — a `sok` caller reading English through a Korean window is answered in
 * English only if the host does the resolving. Handing over the resolved string instead freezes it
 * to the language this ran in, which for a description is the language the plugin was registered
 * in and never changes again.
 */
export function sentence(key: MessageKey): { en: string; ko: string } {
  return MESSAGES[key];
}

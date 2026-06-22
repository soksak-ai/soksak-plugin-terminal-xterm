// terminal 플러그인 i18n — 사람 UI 텍스트. 호스트 표시 언어로 해소.
type Dict = Record<string, string>;

const EN: Dict = {
  connecting: "Connecting…",
  error: "Terminal error",
  title: "Terminal",
};

const KO: Dict = {
  connecting: "연결 중…",
  error: "터미널 오류",
  title: "터미널",
};

export function t(key: string, lang: string): string {
  const dict = lang === "ko" ? KO : EN;
  return dict[key] ?? EN[key] ?? key;
}

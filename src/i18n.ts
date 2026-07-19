// terminal 플러그인 i18n — 사람 UI 텍스트. 호스트 표시 언어로 해소.
// 복원(restore) 문자열은 kit(soksak-kit-terminal-common/restore)이 소유한다 — 여기엔 이 플러그인
// 고유 문자열만(UI 라벨 + 활동 로그 문장). 활동 문자열은 activity 추출 시 kit 으로 옮긴다.
type Dict = Record<string, string>;

const EN: Dict = {
  connecting: "Connecting…",
  error: "Terminal error",
  title: "Terminal",
  // 활동 로그 — 이 플러그인이 소유하는 터미널 명령 활동의 표시/낭독 문장(코어 아님).
  "activity.exit": "exit",
  "activity.done.ok": "A terminal command finished.",
  "activity.done.fail": "A command failed with code",
};

const KO: Dict = {
  connecting: "연결 중…",
  error: "터미널 오류",
  title: "터미널",
  "activity.exit": "종료",
  "activity.done.ok": "터미널 명령이 끝났어요.",
  "activity.done.fail": "명령이 실패했어요. 코드",
};

export function t(key: string, lang: string): string {
  const dict = lang === "ko" ? KO : EN;
  return dict[key] ?? EN[key] ?? key;
}

// terminal 플러그인 i18n — 사람 UI 텍스트. 호스트 표시 언어로 해소.
type Dict = Record<string, string>;

const EN: Dict = {
  connecting: "Connecting…",
  error: "Terminal error",
  title: "Terminal",
  // 활동 로그 — 이 플러그인이 소유하는 터미널 명령 활동의 표시/낭독 문장(코어 아님).
  "activity.exit": "exit",
  "activity.done.ok": "A terminal command finished.",
  "activity.done.fail": "A command failed with code",
  // cold 복원 고지 — 죽은 세션의 봉인 화면을 다시 그렸을 때 화면에 찍는다(무음 금지).
  "cold-restore-notice":
    "[Restored from a sealed checkpoint — the running process ended and was not restored; only the screen record was repainted]",
  // degraded 고지 — 복원 사이드카에 닿지 못했을 때(활동 로그).
  "restore.degraded":
    "Could not reach the terminal restore sidecar — restore is degraded (falling back to the sealed record).",
  "restore.cold-blocked":
    "Sealed screen restore is blocked; starting live only.",
  "sidecar.spawn-failed": "Failed to spawn the terminal restore sidecar.",
  "sidecar.subscribe-timeout":
    "The restore sidecar did not subscribe this session in time — restore fidelity is limited for this session.",
};

const KO: Dict = {
  connecting: "연결 중…",
  error: "터미널 오류",
  title: "터미널",
  "activity.exit": "종료",
  "activity.done.ok": "터미널 명령이 끝났어요.",
  "activity.done.fail": "명령이 실패했어요. 코드",
  "cold-restore-notice":
    "[봉인 체크포인트에서 복원 — 실행 중이던 프로세스는 종료되어 복원되지 않았고, 화면 기록만 다시 그렸습니다]",
  "restore.degraded":
    "터미널 복원 사이드카에 닿지 못해 복원이 제한됩니다(봉인 기록으로 폴백).",
  "restore.cold-blocked": "봉인 화면 복원이 차단되어 라이브만 시작합니다.",
  "sidecar.spawn-failed": "터미널 복원 사이드카 스폰에 실패했습니다.",
  "sidecar.subscribe-timeout":
    "복원 사이드카가 이 세션을 제때 구독하지 못했습니다 — 이 세션의 복원 충실도가 제한됩니다.",
};

export function t(key: string, lang: string): string {
  const dict = lang === "ko" ? KO : EN;
  return dict[key] ?? EN[key] ?? key;
}

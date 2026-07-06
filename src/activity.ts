// 터미널 활동 자기기술 — 이 플러그인이 소유하는 표시(message)·낭독(speak) 문장을 구성한다.
// 코어는 command.started/finished 사실만 발행하고, 활동 로그의 문장은 여기(플러그인 i18n)가 짓는다
// (MESSAGE-PROTOCOL §3). plugin-entry 가 app.activity.publish 로 이 결과를 그대로 싣는다.
import { t } from "./i18n";

/** command.started → 표시만(시작은 낭독하지 않는다). `$ <명령라인>`. */
export function terminalStartedActivity(commandLine: string | null | undefined): {
  message: string;
} {
  return { message: `$ ${commandLine ?? ""}`.trimEnd() };
}

/** command.finished → 표시(종료 코드) + 낭독(성공/실패 문장). 코드 없음/0 = 성공 취급. */
export function terminalFinishedActivity(
  exitCode: number | undefined,
  lang: string,
): { message: string; speak: string } {
  return {
    message: `${t("activity.exit", lang)} ${exitCode ?? ""}`.trimEnd(),
    speak:
      exitCode == null || exitCode === 0
        ? t("activity.done.ok", lang)
        : `${t("activity.done.fail", lang)} ${exitCode}.`,
  };
}

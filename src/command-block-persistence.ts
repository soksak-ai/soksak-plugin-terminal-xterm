// 명령 블록 영속 — 이 터미널 pane 의 명령 이력을 코어 app.data records 에 저장(R3)하고, 재시작·
// unlock 시 복원(R4)한다. vault lock 시 화면 평문 폐기(R14). 각 pane 은 자기 키(viewId=paneId)로
// 격리되며, scope 는 프로젝트 단위(root/projectId)다. "data" 권한 없으면 no-op(graceful).
import type {
  PluginApi,
  PluginViewContext,
  Disposable,
} from "soksak-kit-terminal-common";
import type { TerminalInstance } from "./terminal";

const BLOCKS_COLL = "command_blocks";
const RESTORE_N = 50; // 복원 budget(마지막 N 블록 — startup 비용 바운드)
const RETAIN_CAP = 1000; // view 당 보존 cap(R5, #8835 의 1000-row 권고)

/**
 * 이 터미널 뷰의 명령 블록 영속을 배선한다. "data" 권한 없으면 no-op(graceful).
 * - 복원(R4): mount 직후 이 viewId 의 마지막 N 블록을 inert text 로 write("[복원됨]" dim 마커, 재실행 0).
 * - 저장(R3): turn.ended(source:shell, 이 pane) 시 블록(commandLine/output/cwd/exitCode) put → retention.
 */
export async function setupBlockPersistence(
  app: PluginApi,
  vctx: PluginViewContext,
  viewId: string,
  inst: TerminalInstance,
): Promise<Disposable | null> {
  const data = app.data;
  if (!data) return null; // "data" 권한 미선언 → 복원 기능 비활성(graceful)
  const scope = vctx.root ?? vctx.projectId ?? "default"; // 프로젝트 단위 격리

  // 컬렉션 정의(멱등) — viewId 인덱스(복원 조회), commandLine FTS(검색). output 은 평문(단계② 가 암호화).
  await data.define(BLOCKS_COLL, { indexes: ["viewId", "startTs"], fts: ["commandLine"] }).catch(() => {});

  // 복원(R4): 이 viewId 의 마지막 N 블록(created 순) → inert text. 재실행 안 함(A6). 암호화 scope 가
  // lock 이면 query 가 Err → catch(미페인트) → unlock broadcast 시 재호출(아래 onUnlocked).
  const hydrate = async () => {
    try {
      const blocks = (await data.query(BLOCKS_COLL, {
        scope,
        where: { viewId },
        order: "created",
        desc: false,
        limit: RESTORE_N,
      })) as Array<{
        commandLine?: string | null;
        output?: string | null;
        exitCode?: number | null;
        sessionId?: string | null;
        verified?: boolean | null; // [R9] lock 중 저장분(미인증)이면 false → resume affordance 차단
      }>;
      // 블록 output 은 turn 종료 시점의 "화면 전체 덤프"(readBuffer)다 — 블록마다 그대로
      // 그리면 화면이 블록 수만큼 중복 페인트돼 지저분해진다(실측). 그래서:
      //   · 이전 블록들 = 명령 마커 1줄만(이어가기 힌트 포함) — 컴팩트한 이력.
      //   · 마지막 블록 = 마커 + 화면 덤프 — 종료 시점 화면 그대로 복원.
      // 명령 없는 빈 턴(프롬프트만 지나간 turn.ended)은 그리지 않는다(마커 노이즈).
      const paintable = blocks.filter((b) => !!b.commandLine);
      // 라이브 프롬프트가 먼저 도착해 커서가 줄 중간이면 첫 마커가 그 줄에 이어붙는다(실측)
      // — 화면에 이미 내용이 있으면 줄을 끊고 시작한다.
      let lead = (inst.readBuffer(2) ?? "").trim().length > 0 ? "\r\n" : "";
      for (let i = 0; i < paintable.length; i++) {
        const b = paintable[i];
        // [R9] sessionId 가 있고 인증된(verified !== false) claude 블록만 '이어가기' 힌트. lock 중 저장된
        // 위조 가능 블록(verified===false)엔 affordance 를 안 띄운다(위조 history→공격자 resume 차단).
        const resumable = b.sessionId && b.verified !== false;
        const hint = resumable ? ` · sok terminal.resume {"session":"${b.sessionId}"}` : "";
        // "[복원됨]" dim 마커로 라이브와 구분(R4). ANSI 보존은 후속 addon-serialize.
        const head = `${lead}\x1b[2m[복원됨 ${b.commandLine}${hint}]\x1b[0m\r\n`;
        lead = "";
        if (i < paintable.length - 1) {
          inst.write(head);
          continue;
        }
        // xterm 은 \r\n 이어야 열이 리셋된다(\n 만 쓰면 계단 — 실측). 그리고 덤프에는 이전
        // 세대의 "[복원됨 …]" 마커 줄이 찍혀 있어 그대로 그리면 세대를 넘어 증식한다(실측)
        // — 마커 줄을 걷어내고 그린다(저장 원본은 유지, 판단은 페인트에서만).
        const out = (b.output ?? "")
          .split(/\r?\n/)
          .filter((ln) => !ln.includes("[복원됨")) // 줄 중간 화석(프롬프트+마커 충돌 줄)도 제거
          .join("\r\n");
        inst.write(head + out + (out.endsWith("\r\n") || out.length === 0 ? "" : "\r\n"));
      }
    } catch {
      /* 복원 실패(잠김 등)는 라이브 동작 비차단 — unlock 시 재시도 */
    }
  };
  // [복원 소유권 계약] 이 터미널이 마운트 시 복원 화면을 그렸으면(warm rehydrate | cold 봉인
  // 페인트) 그 화면이 뷰포트 권위다: 복원 프레임은 최근 이력을 이미 화면으로 담고, 그 위로
  // 명령-블록 repaint(마커 + 마지막-블록 화면덤프)를 그리면 복원 프레임과 소실 고지가 뷰포트
  // 밖(스크롤백)으로 밀려 사용자가 못 본다(실측 — cold 재오픈 시 100줄+ 위로). 렌더 순서는
  // 고정이라(복원 페인트가 spawn 중 먼저, hydrate 는 그 아래) 마커를 남기면 이력이 클수록
  // 프레임을 뷰포트 밖으로 민다 → 복원된 pane 에선 mount repaint 를 생략한다. 억제되는 건
  // "화면 그리기"뿐이다: 저장(turn.ended→put)은 계속되어 command_blocks 모델은 app.data 에
  // 그대로 쌓이고, 다음 신선 open 이 마커·이어가기 힌트를 다시 그린다. 복원 pane 에서 잃는 건
  // 인라인 resume 힌트뿐이며(terminal.resume 커맨드는 유지), warm 은 세션이 살아 있어 resume 이
  // 불필요하다. 신호는 플러그인-내부다(inst.restorePainted) — 이 플러그인이 복원을 소유하니
  // 스스로 그렸는지 스스로 안다(외부 신호 불요). 복원이 없었을
  // 때만(신선 터미널·잠긴 볼트로 cold 차단) floor 로 그린다.
  if (!inst.restorePainted) await hydrate(); // mount 시 1회(복원 안 됐을 때만 — 평문/unlock 즉시 복원)

  // [R9] vault lock 동안 저장된 블록은 미인증(발신자 인증 없는 공개키 봉인 — 위조 가능) → verified=false.
  // 이어가기 affordance 를 그런 블록엔 안 띄운다. lock/unlock 이벤트로 갱신(아래 onLocked/onUnlocked).
  let locked = false;

  // 저장(R3): turn.ended(shell) 시 블록 기록 + retention. 시작 시각·pid 추적(command.started 동반).
  let startTs = Date.now();
  let startPid: number | null = null; // [R2] 명령 시작 시 foreground pid(best-effort)
  const unStart = app.events.on("command.started", (p) => {
    const e = p as { paneId?: string; pid?: number | null };
    if (e.paneId === viewId) {
      startTs = Date.now();
      startPid = e.pid ?? null;
    }
  });
  const unEnd = app.events.on("turn.ended", (p) => {
    const e = p as {
      source?: string;
      paneId?: string;
      command?: string | null;
      cwd?: string | null;
      exitCode?: number;
      agentKind?: string | null; // [단계⑤] claude/codex 이면 종류
      sessionId?: string | null; // [단계⑤] 그 세션 id(코어 ai_session 매칭) — 복원 후 이어가기 토대
    };
    if (e.source !== "shell" || e.paneId !== viewId) return;
    const output = inst.readBuffer(); // 화면 텍스트(plain; ANSI 보존은 후속 addon-serialize)
    void data
      .put(
        BLOCKS_COLL,
        {
          viewId,
          commandLine: e.command ?? null,
          output,
          cwd: e.cwd ?? null,
          exitCode: e.exitCode ?? null,
          agentKind: e.agentKind ?? null, // 계보(R2 스키마) — 비-에이전트 명령은 null
          sessionId: e.sessionId ?? null,
          pid: startPid, // [R2] 명령 foreground pid(command/pid/sessionId 짝, best-effort)
          verified: !locked, // [R9] lock 중 저장이면 미인증 → 복원 시 resume affordance 차단
          startTs,
          endTs: Date.now(),
        },
        { scope },
      )
      .then(() => data.retentionTrim(BLOCKS_COLL, scope, RETAIN_CAP))
      .catch((err: unknown) => console.error("[terminal] 블록 저장 실패:", err));
  });

  // [단계③·R14] vault 잠금 시 화면 평문 폐기 — 코어가 broadcast 하는 "soksak:vault-locked" DOM 이벤트
  // (autoLock.ts VAULT_LOCKED_EVENT 계약)를 듣고 스크롤백을 clear 한다. 가림이 아니라 실제 삭제 —
  // 복원된 블록·라이브 출력에 남은 비밀 echo 를 메모리/화면에서 지운다. 잠금은 사용자 의도적 행위(수동
  // 또는 opt-in idle)라 무조건 clear 가 안전한 기본값. PTY(뒷단)는 코어 소유라 계속 산다.
  const onLocked = () => {
    locked = true; // 이후 저장 블록은 미인증(R9)
    try {
      inst.setScreenSuspended(true); // 잠금 중 새 PTY 출력 미페인트(평문 미노출, ACK 는 지속)
      inst.clear(); // 기존 화면 평문 폐기
    } catch {
      /* clear 실패는 라이브 동작 비차단 */
    }
  };
  window.addEventListener("soksak:vault-locked", onLocked);

  // [단계④·R14] unlock 시 sealed 기록에서 재-hydrate — 잠금 중 clear 한 화면(+잠금 동안 봉인 저장된 뒷단
  // 블록)을 복원한다. clear 후 hydrate 로 잔여 평문 라이브 출력도 비우고 sealed 블록만 다시 그린다.
  const onUnlocked = () => {
    locked = false;
    try {
      inst.setScreenSuspended(false); // 화면 페인트 재개
      inst.clear(); // 잠금 직전 잔여 비우고 sealed 기록만 다시 그린다
    } catch {
      /* clear 실패 무시 */
    }
    void hydrate();
  };
  window.addEventListener("soksak:vault-unlocked", onUnlocked);

  return {
    dispose: () => {
      unStart.dispose();
      unEnd.dispose();
      window.removeEventListener("soksak:vault-locked", onLocked);
      window.removeEventListener("soksak:vault-unlocked", onUnlocked);
    },
  };
}

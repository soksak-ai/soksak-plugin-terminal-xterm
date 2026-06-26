// soksak terminal 플러그인 엔트리 — loader 가 blob-URL 로 import 하는 단일 ESM(esbuild 번들).
// 콘텐츠 뷰 "content" 를 등록 → xterm.js 터미널을 마운트, app.pty.* 로 PTY 구동.
import { injectStyles } from "./styles";
import { createTerminalInstance } from "./terminal";
import { registerCommands, registerTerminal, unregisterTerminal } from "./commands";
import type { Disposable, PluginApi, PluginContext, PluginViewContext } from "./host";
import type { TerminalInstance } from "./terminal";

// [단계①] 명령 블록 영속 — 코어 app.data records 에 저장(R1), 복원(R4), retention(R5).
const BLOCKS_COLL = "command_blocks";
const RESTORE_N = 50; // 복원 budget(마지막 N 블록 — startup 비용 바운드)
const RETAIN_CAP = 1000; // view 당 보존 cap(R5, #8835 의 1000-row 권고)

/**
 * 이 터미널 뷰의 명령 블록 영속을 배선한다. "data" 권한 없으면 no-op(graceful).
 * - 복원(R4): mount 직후 이 viewId 의 마지막 N 블록을 inert text 로 write("[복원됨]" dim 마커, 재실행 0).
 * - 저장(R3): turn.ended(source:shell, 이 pane) 시 블록(commandLine/output/cwd/exitCode) put → retention.
 */
async function setupBlockPersistence(
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

  // 복원(R4): 이 viewId 의 마지막 N 블록(created 순) → inert text. 재실행 안 함(A6).
  try {
    const blocks = (await data.query(BLOCKS_COLL, {
      scope,
      where: { viewId },
      order: "created",
      desc: false,
      limit: RESTORE_N,
    })) as Array<{ commandLine?: string | null; output?: string | null; exitCode?: number | null }>;
    for (const b of blocks) {
      // "[복원됨]" dim 마커로 라이브와 구분(R4). output 은 그대로 write(ANSI 보존은 단계 후 addon-serialize).
      const head = `\x1b[2m[복원됨${b.commandLine ? ` ${b.commandLine}` : ""}]\x1b[0m\r\n`;
      inst.write(head + (b.output ?? "") + "\r\n");
    }
  } catch {
    /* 복원 실패는 라이브 동작 비차단 */
  }

  // 저장(R3): turn.ended(shell) 시 블록 기록 + retention. 시작 시각 추적(startTs).
  let startTs = Date.now();
  const unStart = app.events.on("command.started", (p) => {
    const e = p as { paneId?: string };
    if (e.paneId === viewId) startTs = Date.now();
  });
  const unEnd = app.events.on("turn.ended", (p) => {
    const e = p as { source?: string; paneId?: string; command?: string | null; cwd?: string | null; exitCode?: number };
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
          startTs,
          endTs: Date.now(),
        },
        { scope },
      )
      .then(() => data.retentionTrim(BLOCKS_COLL, scope, RETAIN_CAP))
      .catch(() => {});
  });

  // [단계③·R14] vault 잠금 시 화면 평문 폐기 — 코어가 broadcast 하는 "soksak:vault-locked" DOM 이벤트
  // (autoLock.ts VAULT_LOCKED_EVENT 계약)를 듣고 스크롤백을 clear 한다. 가림이 아니라 실제 삭제 —
  // 복원된 블록·라이브 출력에 남은 비밀 echo 를 메모리/화면에서 지운다. 잠금은 사용자 의도적 행위(수동
  // 또는 opt-in idle)라 무조건 clear 가 안전한 기본값. PTY(뒷단)는 코어 소유라 계속 산다.
  const onLocked = () => {
    try {
      inst.clear();
    } catch {
      /* clear 실패는 라이브 동작 비차단 */
    }
  };
  window.addEventListener("soksak:vault-locked", onLocked);

  return {
    dispose: () => {
      unStart.dispose();
      unEnd.dispose();
      window.removeEventListener("soksak:vault-locked", onLocked);
    },
  };
}

export default {
  activate(ctx: PluginContext) {
    const app = ctx.app;
    injectStyles();

    if (app.ui?.registerView) {
      ctx.subscriptions.push(
        app.ui.registerView("content", {
          mount(container: HTMLElement, vctx: PluginViewContext) {
            // 뷰 컨테이너 초기화
            container.style.position = "relative";
            container.style.overflow = "hidden";

            // 래퍼 div — data-node="terminal" + 100% fill
            const wrap = document.createElement("div");
            wrap.className = "sk-term-wrap";
            wrap.style.cssText = "position:absolute;inset:0;";
            container.appendChild(wrap);

            const viewId = vctx.viewId ?? `term-${Date.now()}`;

            vctx.setTitle("Terminal");
            vctx.setStatus({ code: "connecting", message: "Starting…" });

            if (!app.pty) {
              vctx.setStatus({ code: "error", message: "pty permission not granted" });
              return;
            }

            let disposed = false;
            let termInst: import("./terminal").TerminalInstance | null = null;
            // 코어 substrate 에 등록한 IO 핸들(있으면 dispose 에서 해지). app.terminal.readBuffer/
            // sendText 가 이 viewId(=paneId)로 이 터미널의 버퍼 읽기·입력 쓰기에 닿게 한다.
            let ioReg: import("./host").Disposable | null = null;
            // 설정은 플러그인 소유(manifest config) — app.settings 에서 effective 값을 읽어 적용.
            const readSettings = (): import("./terminal").TermSettings => {
              const all = app.settings?.all?.() ?? {};
              return {
                fontFamily: all.fontFamily as string | undefined,
                fontSize: all.fontSize as number | undefined,
                scrollback: all.scrollback as number | undefined,
                cursorBlink: all.cursorBlink as boolean | undefined,
                cursorStyle: all.cursorStyle as
                  | "block"
                  | "underline"
                  | "bar"
                  | undefined,
                xtermRenderer: all.xtermRenderer as "webgl" | "dom" | undefined,
              };
            };
            // 셸 경로("" = 시스템 기본 $SHELL). spawn 시점 1회 적용(런타임 변경은 새 터미널부터).
            const shell = (app.settings?.get?.("shell") as string | undefined) ?? "";
            // 값 변경 시 라이브 재적용(폴링 없음). 해지는 dispose 에서.
            const unSettings = app.settings?.onChange?.(() =>
              termInst?.applySettings(readSettings()),
            );

            createTerminalInstance({
              pty: app.pty,
              cwd: vctx.root ?? undefined,
              shell: shell || undefined,
              // paneId = 이 콘텐츠 뷰의 안정 view.id. 코어가 SOKSAK_PANE 으로 주입하고, 관찰
              // substrate(app.terminal.getCwd/onCwd/onCommandFinished·command.*/turn.ended)를
              // 이 키로 묶는다 — cwd 추종 뷰(파일트리)가 같은 id 로 따라온다.
              paneId: viewId,
              // 에이전트 프로그램(claude/codex)의 자동 실행 명령 — 셸 프롬프트가 뜨면 PTY 가
              // 버퍼한 입력을 처리한다(첫 pane 1회). 코어가 ContributedProgram.command 를
              // PluginViewContext.command 로 흘려보낸다(뷰 종류 무관 채널 — 터미널만 실행).
              initialCommand: vctx.command ?? undefined,
              settings: readSettings(),
            }).then((inst) => {
              if (disposed) {
                // unmount 가 spawn 보다 먼저 일어난 경우 — 즉시 정리.
                inst.dispose().catch(() => {});
                return;
              }
              termInst = inst;
              // inst.element 에 data-node 가 이미 설정됨 (terminal.ts)
              wrap.appendChild(inst.element);
              inst.focus();
              registerTerminal(viewId, inst);
              // app.terminal.readBuffer/sendText 가 이 터미널에 닿도록 IO 핸들 등록(키=viewId=paneId).
              ioReg = app.pty?.registerIo?.(viewId, {
                readBuffer: (lines?: number) => inst.readBuffer(lines),
                sendInput: (data: string) => inst.sendInput(data),
              }) ?? null;
              // [단계①] 명령 블록 복원(R4) + 저장(R3) — "data" 권한 있을 때만. scope=projectId.
              setupBlockPersistence(app, vctx, viewId, inst).then((d) => {
                if (d) ctx.subscriptions.push(d);
              });
              vctx.setStatus(null);
              vctx.setTitle("Terminal");
            }).catch((err: unknown) => {
              if (!disposed) {
                vctx.setStatus({ code: "error", message: String(err) });
              }
            });

            // 언마운트 핸들러 — unmount() 에서 호출.
            // termInst 를 직접 참조해 PTY 세션을 닫는다(레지스트리 경유 없음).
            (wrap as unknown as Record<string, unknown>).__skTermDispose = async () => {
              disposed = true;
              unSettings?.dispose();
              ioReg?.dispose(); // substrate IO 핸들 해지(누수 0)
              ioReg = null;
              unregisterTerminal(viewId);
              if (termInst) {
                await termInst.dispose().catch(() => {});
                termInst = null;
              }
            };
            (container as unknown as Record<string, unknown>).__skTermWrap = wrap;
          },

          unmount(container: HTMLElement) {
            const wrap = (container as unknown as Record<string, unknown>).__skTermWrap as HTMLElement | undefined;
            if (wrap) {
              const fn = (wrap as unknown as Record<string, unknown>).__skTermDispose as (() => Promise<void>) | undefined;
              fn?.().catch(() => {});
              container.replaceChildren();
              delete (container as unknown as Record<string, unknown>).__skTermWrap;
            }
          },
        }),
      );
    }

    registerCommands(ctx);
  },

  deactivate() {
    const s = document.getElementById("sk-terminal-style");
    if (s) s.remove();
  },
};

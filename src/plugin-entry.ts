// soksak terminal 플러그인 엔트리 — loader 가 blob-URL 로 import 하는 단일 ESM(esbuild 번들).
// 콘텐츠 뷰 "content" 를 등록 → xterm.js 터미널을 마운트, app.pty.* 로 PTY 구동.
import { injectStyles } from "./styles";
import { createTerminalInstance } from "./terminal";
import { registerCommands, registerTerminal, unregisterTerminal } from "./commands";
import type { PluginContext, PluginViewContext } from "./host";

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

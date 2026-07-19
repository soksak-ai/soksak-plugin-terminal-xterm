// soksak terminal 플러그인 엔트리 — loader 가 blob-URL 로 import 하는 단일 ESM(esbuild 번들).
// 콘텐츠 뷰 "content" 를 등록 → xterm.js 터미널을 마운트, app.pty.* 로 PTY 구동. 렌더러 생성·
// 명령 블록 영속·설정 재적용은 mount-pane.ts(mountPane)가 pane 단위로 소유한다 — 여기는 마운트
// 수명·포커스 코디네이션·IO/명령 배선·분할 방식(splitMode) 분기만 얇게 처리한다(ghostty 와 대칭).
import { injectStyles } from "./styles";
import { mountPane } from "./mount-pane";
import { registerCommands, registerTerminal, unregisterTerminal } from "./commands";
import {
  ensureSidecar,
  createFocusCoordinator,
  createPaneSplitHost,
  createActivePaneProxy,
  terminalStartedActivity,
  terminalFinishedActivity,
  type FocusCoordinator,
  type PaneSplitHost,
  type Disposable,
  type PluginContext,
  type PluginViewContext,
} from "soksak-kit-terminal-common";
import type { TerminalInstance } from "./terminal";

// per-view 마운트 상태 — 포커스 코디네이터(렌더러 준비 전 포커스 요청을 잡는다) + (비분할) 단일
// 렌더러 또는 (탭내) 분할 호스트 + io 핸들. split-pane 명령이 이 맵에서 대상 뷰를 찾는다.
interface Mounted {
  focus: FocusCoordinator;
  single: TerminalInstance | null;
  splitHost: PaneSplitHost | null;
  io: Disposable | null;
  disposed: boolean;
}
const mounts = new Map<string, Mounted>();

// 뷰 마운트 — splitMode 를 읽어 단일 렌더러(탭분할은 코어 panel.split) 또는 탭내 pane 분할로
// 배선한다. 정리 함수를 반환한다.
function mountTerminal(
  container: HTMLElement,
  ctx: PluginContext,
  vctx: PluginViewContext,
): () => void {
  const app = ctx.app;
  container.style.position = "relative";
  container.style.overflow = "hidden";
  const wrap = document.createElement("div");
  wrap.className = "sk-term-wrap";
  wrap.style.cssText = "position:absolute;inset:0;";
  container.appendChild(wrap);

  const viewId = vctx.viewId ?? `term-${Date.now()}`;
  vctx.setTitle("Terminal");
  vctx.setStatus({ code: "connecting", message: "Starting…" });
  if (!app.pty) {
    vctx.setStatus({ code: "error", message: "pty permission not granted" });
    return () => {};
  }

  const m: Mounted = {
    focus: createFocusCoordinator(),
    single: null,
    splitHost: null,
    io: null,
    disposed: false,
  };
  mounts.set(viewId, m);

  // 복원 seam(B3): 재시작 복원이면 마지막 관찰 cwd 에서 시작(코어가 OSC 관찰값을 영속해 restore.cwd
  // 로 전달). 새 뷰·값 없음 = 프로젝트 root(기존 동작).
  const cwd = vctx.restore?.cwd ?? vctx.root ?? undefined;
  // 설정이 분할 방식을 정한다: "within-tab" = 뷰 내부를 pane 으로(kit split 호스트), 그 외 = 단일
  // 렌더러(탭분할은 코어 panel.split 이 담당). 기본은 "tab"(정상 경로 무손상).
  const withinTab = String(app.settings?.get?.("splitMode") ?? "tab") === "within-tab";
  const fail = (err: unknown): void => {
    if (!m.disposed) vctx.setStatus({ code: "error", message: String(err) });
  };

  if (withinTab) {
    // 각 pane 은 자기 PTY·자기 블록 이력(paneId=`${viewId}~n`). io/포커스/명령은 활성 pane 에 위임.
    // 첫 pane 만 initialCommand(에이전트 자동 실행).
    let seq = 0;
    let first = true;
    void createPaneSplitHost({
      container: wrap,
      mintPaneId: () => `${viewId}~${seq++}`,
      createRenderer: async (paneId) => {
        const r = await mountPane(app, {
          vctx,
          paneId,
          cwd,
          initialCommand: first ? vctx.command ?? undefined : undefined,
        });
        first = false;
        return r;
      },
      onEmpty: () => vctx.setStatus({ code: "error", message: "빈 뷰 — 마지막 pane 이 닫혔습니다" }),
    })
      .then((h) => {
        if (m.disposed) {
          void h.dispose();
          return;
        }
        m.splitHost = h;
        // 코어 substrate IO — viewId 로 등록하되 활성 pane 에 위임(term.read/term.send 가 활성 pane 에 닿음).
        m.io =
          app.pty?.registerIo?.(viewId, {
            readBuffer: (lines) => h.active()?.renderer.readBuffer(lines) ?? "",
            sendInput: (data) => h.active()?.renderer.sendInput(data),
          }) ?? null;
        m.focus.attach({
          focus: () => h.active()?.renderer.focus(),
          prepareFocusTransfer: () => h.active()?.renderer.prepareFocusTransfer(),
        });
        // 명령(send/clear/resume/perf) 대상 레지스트리 — 위임 프록시 하나 등록(활성 pane 추종).
        registerTerminal(viewId, createActivePaneProxy(h));
        vctx.setStatus(null);
      })
      .catch(fail);
    return () => cleanup(m, viewId, container);
  }

  void mountPane(app, { vctx, paneId: viewId, cwd, initialCommand: vctx.command ?? undefined })
    .then((inst) => {
      if (m.disposed) {
        void inst.dispose(); // 마운트 완료 전 unmount — 즉시 정리(그 사이 스폰된 PTY 를 닫는다)
        return;
      }
      m.single = inst;
      wrap.appendChild(inst.element);
      // app.terminal.readBuffer/sendText 가 이 터미널에 닿도록 IO 핸들 등록(키=viewId=paneId).
      m.io =
        app.pty?.registerIo?.(viewId, {
          readBuffer: (lines) => inst.readBuffer(lines),
          sendInput: (data) => inst.sendInput(data),
        }) ?? null;
      // 렌더러 준비 완료 — 대기 중이던 포커스 요청이 있으면 코디네이터가 적용한다(창전환 팔로우).
      m.focus.attach({ focus: () => inst.focus(), prepareFocusTransfer: () => inst.prepareFocusTransfer() });
      registerTerminal(viewId, inst);
      vctx.setStatus(null);
      vctx.setTitle("Terminal");
    })
    .catch(fail);

  return () => cleanup(m, viewId, container);
}

function cleanup(m: Mounted, viewId: string, container: HTMLElement): void {
  m.disposed = true;
  m.focus.detach();
  m.io?.dispose();
  void m.single?.dispose();
  void m.splitHost?.dispose();
  unregisterTerminal(viewId);
  mounts.delete(viewId);
  container.replaceChildren();
}

export default {
  activate(ctx: PluginContext) {
    const app = ctx.app;
    injectStyles();

    // 생존 서비스 사이드카(터미널 미러 복원)를 스폰한다 — detached 로 앱 종료를 넘어 살고,
    // 싱글턴 프로브가 중복을 흡수한다(idempotent). 이후 각 터미널이 스폰 직후 ensureSession 으로
    // 자기 세션을 이 사이드카에 구독시켜 다음 재시작의 warm 복원 토대를 만든다.
    ensureSidecar(app);

    // 터미널 명령 활동은 이 플러그인이 소유한다 — 코어 브리지 대신 자기 i18n 문장으로 활동 로그에
    // 발행(app.activity.publish). 표시=message, 낭독=speak(§3). 소비자는 kind 무지로 이 둘만 렌더한다.
    ctx.subscriptions.push(
      app.events.on("command.started", (p) => {
        const e = p as { commandLine?: string | null; paneId?: string };
        app.activity.publish("terminal.command.started", {
          ...terminalStartedActivity(e.commandLine),
          paneId: e.paneId,
          commandLine: e.commandLine ?? null,
        });
      }),
    );
    ctx.subscriptions.push(
      app.events.on("command.finished", (p) => {
        const e = p as { exitCode?: number; commandLine?: string | null; paneId?: string };
        app.activity.publish("terminal.command.finished", {
          ...terminalFinishedActivity(e.exitCode, app.locale()),
          exitCode: e.exitCode,
          commandLine: e.commandLine ?? null,
          paneId: e.paneId,
        });
      }),
    );

    if (app.ui?.registerView) {
      const cleanups = new WeakMap<HTMLElement, () => void>();
      ctx.subscriptions.push(
        app.ui.registerView("content", {
          mount(container, vctx) {
            cleanups.set(container, mountTerminal(container, ctx, vctx));
          },
          unmount(container) {
            cleanups.get(container)?.();
            cleanups.delete(container);
          },
          prepareFocusTransfer(_container, vctx) {
            if (vctx.viewId) mounts.get(vctx.viewId)?.focus.prepareTransfer();
          },
          focus(_container, vctx, request) {
            if (vctx.viewId) mounts.get(vctx.viewId)?.focus.request(request);
          },
        }),
      );
    }

    registerCommands(ctx);

    // split-pane — 뷰 내부를 pane 으로 쪼갠다(탭내 분할, splitMode=within-tab 인 뷰만 대상).
    if (app.commands) {
      ctx.subscriptions.push(
        app.commands.register("split-pane", {
          description:
            "Split the terminal view into an internal pane (within-tab split; requires splitMode=within-tab).",
          triggers: { ko: "터미널 탭내 분할 나누기" },
          params: {
            view: { type: "string", description: "Target view id (omit = first within-tab view)" },
            dir: { type: "string", description: "'right' (default) or 'down'" },
          },
          returns: "{ ok, viewId?, paneId? }",
          message: (d) => (d.ok ? `pane ${d.paneId} 을 분할했습니다.` : "분할 대상 없음"),
          handler: async (p) => {
            const viewId =
              typeof p.view === "string" && p.view
                ? p.view
                : [...mounts].find(([, mm]) => mm.splitHost)?.[0];
            const mm = viewId ? mounts.get(viewId) : undefined;
            if (!mm?.splitHost) {
              return {
                ok: false,
                code: "NO_TARGET",
                message: "no within-tab split host (set splitMode=within-tab)",
              };
            }
            const paneId = await mm.splitHost.split(p.dir === "down" ? "col" : "row");
            return { ok: true, viewId, paneId };
          },
        }),
      );
    }
  },

  deactivate() {
    const s = document.getElementById("sk-terminal-style");
    if (s) s.remove();
    for (const m of mounts.values()) {
      void m.single?.dispose();
      void m.splitHost?.dispose();
    }
    mounts.clear();
  },
};

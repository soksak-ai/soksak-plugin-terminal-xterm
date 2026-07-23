// soksak terminal 플러그인 엔트리 — loader 가 blob-URL 로 import 하는 단일 ESM(esbuild 번들).
// 콘텐츠 뷰 "content" 를 등록 → xterm.js 터미널을 마운트한다. 마운트 오케스트레이션(splitMode 분기·
// IO/포커스/명령 레지스트리·정리·split-pane 명령)은 kit(mountTerminalView·registerPaneCommands)이
// 소유하고, 여기는 렌더러 팩토리(mountPane: xterm 인스턴스 + 블록 이력)와 뷰 컨테이너·제목만 준다.
import { injectStyles } from "./styles";
import { effectiveSettings, mountPane } from "./mount-pane";
import { dropViewFont, stepViewFont } from "./view-zoom";
import { registerCommands, terminalRegistry } from "./commands";
import {
  ensureSidecar,
  createFocusCoordinator,
  mountTerminalView,
  registerPaneCommands,
  createPaneTreeStore,
  terminalStartedActivity,
  terminalFinishedActivity,
  type FocusCoordinator,
  type TerminalViewHandle,
  type PluginContext,
  type PluginViewContext,
} from "soksak-kit-terminal-common";

// per-view 마운트 상태 — 포커스 코디네이터(뷰 provider 의 focus/prepareFocusTransfer 라우팅) + kit
// 마운트 핸들(split 호스트·dispose 소유). split-pane 명령이 이 맵에서 대상 뷰를 찾는다.
const mounts = new Map<string, { focus: FocusCoordinator; handle: TerminalViewHandle }>();

// 뷰 마운트 — 컨테이너를 래핑하고, splitMode 를 읽어 kit 오케스트레이터에 렌더러 팩토리를 넘긴다.
function mountTerminal(
  container: HTMLElement,
  ctx: PluginContext,
  vctx: PluginViewContext,
): () => void {
  const app = ctx.app;
  container.style.position = "relative";
  container.style.overflow = "hidden";
  // 래퍼 div(.sk-term-wrap) — 100% fill. pane/렌더러는 이 안에 들어간다.
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

  // 복원 seam(B3): 재시작 복원이면 마지막 관찰 cwd 에서 시작(코어가 OSC 관찰값을 영속해 restore.cwd
  // 로 전달). 새 뷰·값 없음 = 프로젝트 root(기존 동작).
  const cwd = vctx.restore?.cwd ?? vctx.root ?? undefined;
  // 설정이 분할 방식을 정한다: "within-tab" = 뷰 내부 pane, 그 외 = 단일 렌더러(탭분할=코어 panel.split).
  const withinTab = String(app.settings?.get?.("splitMode") ?? "tab") === "within-tab";
  // within-tab 분할 구조 영속(remount 넘어 pane 복원) — "data" 권한 있을 때만(kv). 없으면 undefined(graceful).
  const treeStore = withinTab && app.data?.kv ? createPaneTreeStore(app.data.kv, viewId) : undefined;
  const focus = createFocusCoordinator();
  const handle = mountTerminalView(app, {
    mountRoot: wrap,
    viewId,
    withinTab,
    focus,
    registry: terminalRegistry,
    treeStore,
    // pane 마다 xterm 인스턴스 + 이 pane 의 블록 이력. 첫 pane 만 initialCommand(에이전트 자동 실행).
    // 복원은 pane 폭에 상관없이 동일하다 — kit orchestrateRestore 가 rehydrate 전 미러를 pane 폭으로
    // 맞춰 warm 재부착(TUI·스크롤백)을 정확히 되살린다(within-tab 특례 없음).
    createRenderer: (paneId, isFirst) =>
      mountPane(app, {
        vctx,
        paneId,
        cwd,
        initialCommand: isFirst ? vctx.command ?? undefined : undefined,
      }),
    setStatus: (s) => vctx.setStatus(s),
    emptyMessage: "빈 뷰 — 마지막 pane 이 닫혔습니다",
  });
  mounts.set(viewId, { focus, handle });

  return () => {
    handle.dispose();
    mounts.delete(viewId);
    dropViewFont(viewId);
    container.replaceChildren();
  };
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
          setFocused(_container, vctx, focused) {
            if (vctx.viewId) mounts.get(vctx.viewId)?.handle.setFocused(focused);
          },
          prepareFocusTransfer(_container, vctx) {
            if (vctx.viewId) mounts.get(vctx.viewId)?.focus.prepareTransfer();
          },
          focus(_container, vctx, request) {
            if (vctx.viewId) mounts.get(vctx.viewId)?.focus.request(request);
          },
          zoom(_container, vctx, action) {
            // 뷰-단위 폰트 줌(§Zoom) — 델타 스텝 후 이 뷰의 모든 렌더러에 유효 설정 재적용.
            const viewId = vctx.viewId;
            if (!viewId) return;
            const m = mounts.get(viewId);
            if (!m) return;
            stepViewFont(viewId, action);
            const next = effectiveSettings(app, viewId);
            m.handle.eachRenderer((r) => r.applySettings?.(next));
          },
        }),
      );
    }

    registerCommands(ctx);
    // split-pane — kit 이 명령 모양·i18n 을 소유. 대상 호스트 해소만 여기서(view 지정 또는 첫 within-tab).
    registerPaneCommands(ctx, (view) => {
      const viewId = view ?? [...mounts].find(([, m]) => m.handle.splitHost)?.[0];
      const m = viewId ? mounts.get(viewId) : undefined;
      return m?.handle.splitHost ? { viewId: viewId!, host: m.handle.splitHost } : null;
    });
  },

  deactivate() {
    const s = document.getElementById("sk-terminal-style");
    if (s) s.remove();
    for (const m of mounts.values()) m.handle.dispose();
    mounts.clear();
  },
};

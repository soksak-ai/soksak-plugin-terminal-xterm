// 터미널 pane 하나를 세운다 — 렌더러(TerminalInstance) 생성 + 이 pane 의 명령 블록 영속 +
// 설정 라이브 재적용을 배선하고, 그 정리(persistence·settings 구독 해지)를 인스턴스 dispose 에
// 합성해 돌려준다. 그래서 pane 을 어디에 마운트하든(뷰 직접 = 비분할, split 호스트 = 탭내 분할)
// 호출자는 renderer.dispose() 하나로 전부 정리된다. DOM 부착은 호출자 몫(여긴 element 만 만든다).
import { createTerminalInstance, type TerminalInstance, type TermSettings } from "./terminal";
import { setupBlockPersistence } from "./command-block-persistence";
import type {
  PluginApi,
  PluginViewContext,
  Disposable,
} from "soksak-kit-terminal-common";

// 설정은 플러그인 소유(manifest config) — app.settings 에서 effective 값을 읽어 TermSettings 로.
export function readSettings(app: PluginApi): TermSettings {
  const all = app.settings?.all?.() ?? {};
  return {
    fontFamily: all.fontFamily as string | undefined,
    fontSize: all.fontSize as number | undefined,
    scrollback: all.scrollback as number | undefined,
    cursorBlink: all.cursorBlink as boolean | undefined,
    cursorStyle: all.cursorStyle as "block" | "underline" | "bar" | undefined,
    xtermRenderer: all.xtermRenderer as "webgl" | "dom" | undefined,
  };
}

export async function mountPane(
  app: PluginApi,
  opts: {
    vctx: PluginViewContext;
    paneId: string; // 블록 영속·IO 키(비분할=viewId, 탭내=`${viewId}~n`)
    cwd?: string;
    initialCommand?: string;
  },
): Promise<TerminalInstance> {
  if (!app.pty) throw new Error("pty permission not granted");
  // 셸 경로("" = 시스템 기본 $SHELL). spawn 시점 1회 적용(런타임 변경은 새 터미널부터).
  const shell = (app.settings?.get?.("shell") as string | undefined) ?? "";
  const inst = await createTerminalInstance({
    pty: app.pty,
    app,
    cwd: opts.cwd,
    shell: shell || undefined,
    paneId: opts.paneId,
    initialCommand: opts.initialCommand,
    settings: readSettings(app),
  });

  // pane 수명에 묶이는 정리물 — 인스턴스 dispose 에 합성한다(호출자·split 호스트가 pane 을
  // 닫을 때 함께 해지). 설정 변경 라이브 재적용은 pane 마다 구독(각자 자기 inst 에 applySettings).
  const extra: Disposable[] = [];
  const unSettings = app.settings?.onChange?.(() => inst.applySettings(readSettings(app)));
  if (unSettings) extra.push(unSettings);
  // 명령 블록 복원(R4)+저장(R3) — "data" 권한 있을 때만. 키=paneId(pane 별 이력), scope=projectId.
  // 실패를 삼키지 않는다 — 권한 게이트 throw 가 조용히 증발해 저장·복원이 죽은 채 발견이 늦던 실측 결함.
  const blockDisp = await setupBlockPersistence(app, opts.vctx, opts.paneId, inst).catch(
    (err: unknown) => {
      console.error("[terminal] 블록 영속 배선 실패:", err);
      return null;
    },
  );
  if (blockDisp) extra.push(blockDisp);

  const origDispose = inst.dispose.bind(inst);
  inst.dispose = async () => {
    for (const d of extra) {
      try {
        d.dispose();
      } catch {
        /* 정리 실패는 나머지 정리를 막지 않는다 */
      }
    }
    await origDispose();
  };
  return inst;
}

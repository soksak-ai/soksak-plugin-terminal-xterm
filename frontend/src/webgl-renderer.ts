export type XtermRendererKind = "dom" | "webgl";

interface Disposable {
  dispose(): void;
}

export interface XtermWebglAddon extends Disposable {
  onContextLoss(listener: () => void): Disposable;
}

export interface XtermAddonHost {
  loadAddon(addon: XtermWebglAddon): void;
}

export interface XtermRendererLifetime extends Disposable {
  kind(): XtermRendererKind;
}

function releaseWebglContexts(root: HTMLElement): void {
  for (const canvas of Array.from(root.querySelectorAll("canvas"))) {
    const context = canvas.getContext("webgl2");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    canvas.width = 0;
    canvas.height = 0;
  }
}

export function attachXtermWebglRenderer(
  terminal: XtermAddonHost,
  screen: HTMLElement,
  createAddon: () => XtermWebglAddon,
): XtermRendererLifetime {
  const addon = createAddon();
  let current: XtermRendererKind = "dom";
  let stopContextLoss: Disposable | null = null;
  let addonDisposed = false;
  let disposed = false;
  const disposeAddon = () => {
    if (addonDisposed) return;
    addonDisposed = true;
    addon.dispose();
  };
  const useDom = () => {
    if (current === "webgl") releaseWebglContexts(screen);
    current = "dom";
    screen.dataset.renderer = current;
    stopContextLoss?.dispose();
    stopContextLoss = null;
    disposeAddon();
  };
  try {
    terminal.loadAddon(addon);
    current = "webgl";
    screen.dataset.renderer = current;
    stopContextLoss = addon.onContextLoss(useDom);
  } catch {
    useDom();
  }
  return {
    kind: () => current,
    dispose() {
      if (disposed) return;
      disposed = true;
      useDom();
    },
  };
}

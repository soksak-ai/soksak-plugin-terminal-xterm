// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

import { attachXtermWebglRenderer } from "./webgl-renderer";

function fixture(throwOnLoad = false) {
  const screen = document.createElement("div");
  const canvas = document.createElement("canvas");
  const loseContext = vi.fn();
  Object.defineProperty(canvas, "getContext", {
    value: vi.fn(() => ({ getExtension: () => ({ loseContext }) })),
  });
  screen.append(canvas);
  let contextLost = () => {};
  const stopLoss = vi.fn();
  const addon = {
    dispose: vi.fn(),
    onContextLoss(listener: () => void) {
      contextLost = listener;
      return { dispose: stopLoss };
    },
  };
  const terminal = {
    loadAddon: vi.fn(() => {
      if (throwOnLoad) throw new Error("WebGL unavailable");
    }),
  };
  return { screen, loseContext, addon, terminal, lose: () => contextLost(), stopLoss };
}

describe("xterm WebGL renderer lifetime", () => {
  it("publishes WebGL and releases its context on dispose", () => {
    const value = fixture();
    const renderer = attachXtermWebglRenderer(value.terminal, value.screen, () => value.addon);

    expect(renderer.kind()).toBe("webgl");
    expect(value.screen.dataset.renderer).toBe("webgl");
    renderer.dispose();
    renderer.dispose();

    expect(value.loseContext).toHaveBeenCalledOnce();
    expect(value.addon.dispose).toHaveBeenCalledOnce();
    expect(value.stopLoss).toHaveBeenCalledOnce();
  });

  it("falls back to DOM when WebGL activation fails", () => {
    const value = fixture(true);
    const renderer = attachXtermWebglRenderer(value.terminal, value.screen, () => value.addon);

    expect(renderer.kind()).toBe("dom");
    expect(value.screen.dataset.renderer).toBe("dom");
    expect(value.addon.dispose).toHaveBeenCalledOnce();
  });

  it("publishes DOM and disposes the addon after context loss", () => {
    const value = fixture();
    const renderer = attachXtermWebglRenderer(value.terminal, value.screen, () => value.addon);

    value.lose();

    expect(renderer.kind()).toBe("dom");
    expect(value.screen.dataset.renderer).toBe("dom");
    expect(value.addon.dispose).toHaveBeenCalledOnce();
  });
});

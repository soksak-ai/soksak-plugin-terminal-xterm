// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { observeTerminalTheme, readTerminalTheme } from "./theme";

function host(tokens: Record<string, string>): HTMLElement {
  const root = document.documentElement;
  for (const [slot, value] of Object.entries(tokens)) root.style.setProperty(`--${slot}`, value);
  return root;
}

describe("terminal theme", () => {
  it("reads its colours from the host token slots", () => {
    host({ card: "#0b0d10", fg: "#d7e0ea", acc: "#ff9f6e", fg3: "#7d8795" });

    // The plugin owns no palette. Holding its own copy is how a terminal ends
    // up dark inside a light window: two authorities for one colour, and only
    // one of them hears about a theme change.
    expect(readTerminalTheme(document.documentElement)).toEqual({
      background: "#0b0d10",
      foreground: "#d7e0ea",
      cursor: "#ff9f6e",
      cursorAccent: "#0b0d10",
      selectionBackground: "#7d8795",
      black: "#2e3436",
      red: "#cc0000",
      green: "#4e9a06",
      yellow: "#c4a000",
      blue: "#3465a4",
      magenta: "#75507b",
      cyan: "#06989a",
      white: "#d3d7cf",
      brightBlack: "#555753",
      brightRed: "#ef2929",
      brightGreen: "#8ae234",
      brightYellow: "#fce94f",
      brightBlue: "#729fcf",
      brightMagenta: "#ad7fa8",
      brightCyan: "#34e2e2",
      brightWhite: "#eeeeec",
      extendedAnsi: expect.arrayContaining(["#000000", "#ffffff", "#080808", "#eeeeee"]),
    });
    expect(readTerminalTheme(document.documentElement).extendedAnsi).toHaveLength(240);
  });

  it("follows the slots when the theme changes", () => {
    host({ card: "#ffffff", fg: "#1a1a1c", acc: "#c2410c", fg3: "#8a8a93" });

    expect(readTerminalTheme(document.documentElement)).toMatchObject({
      background: "#ffffff",
      foreground: "#1a1a1c",
      cursor: "#c2410c",
    });
  });

  it("reports a change once per theme epoch", async () => {
    const root = document.documentElement;
    root.dataset.themeEpoch = "1";
    const seen: number[] = [];
    const stop = observeTerminalTheme(root, () => seen.push(Number(root.dataset.themeEpoch)));

    // Mutation records arrive in a microtask, so each epoch is awaited rather
    // than read back synchronously; batching two would report one change.
    root.dataset.themeEpoch = "2";
    await Promise.resolve();
    root.dataset.themeEpoch = "3";
    await Promise.resolve();
    stop();
    root.dataset.themeEpoch = "4";
    await Promise.resolve();

    // Colours arrive as inline custom properties, so watching the whole style
    // attribute would also fire for zoom and every unrelated change — in the
    // predecessor that coupling made one font change reflow and re-rasterise
    // every terminal at once. The epoch is the only channel.
    expect(seen).toEqual([2, 3]);
  });

  it("ignores style mutations that are not a theme change", async () => {
    const root = document.documentElement;
    root.dataset.themeEpoch = "1";
    let calls = 0;
    const stop = observeTerminalTheme(root, () => { calls += 1; });

    root.style.setProperty("--app-font-size", "15px");
    await Promise.resolve();
    stop();

    expect(calls).toBe(0);
  });
});

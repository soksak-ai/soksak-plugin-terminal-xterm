import { TERMINAL_ANSI_PALETTE } from "@soksak/soksak-contract-plugin-terminal";

// Default surface colours come from the host. ANSI colours come from the terminal behavior
// contract. Xterm and frame renderers therefore decode the same indexed color into the same pixel.

/** What xterm needs, expressed in the host's vocabulary. */
export interface TerminalTheme {
  background: string;
  foreground: string;
  cursor: string;
  /** The glyph under the block cursor: the colour drawn behind it. */
  cursorAccent: string;
  selectionBackground: string;
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightMagenta: string;
  brightCyan: string;
  brightWhite: string;
  extendedAnsi: string[];
}

const slot = (root: HTMLElement, name: string): string =>
  getComputedStyle(root).getPropertyValue(`--${name}`).trim();

/**
 * Read the current terminal colours from the host token slots.
 *
 * The pane surface is `card`, not `bg`: the terminal fills a pane, and a pane
 * is drawn over the window background rather than being it.
 */
export function readTerminalTheme(root: HTMLElement = document.documentElement): TerminalTheme {
  const background = slot(root, "card");
  const [
    black, red, green, yellow, blue, magenta, cyan, white,
    brightBlack, brightRed, brightGreen, brightYellow,
    brightBlue, brightMagenta, brightCyan, brightWhite,
  ] = TERMINAL_ANSI_PALETTE;
  return {
    background,
    foreground: slot(root, "fg"),
    cursor: slot(root, "acc"),
    cursorAccent: background,
    selectionBackground: slot(root, "fg3"),
    black, red, green, yellow, blue, magenta, cyan, white,
    brightBlack, brightRed, brightGreen, brightYellow,
    brightBlue, brightMagenta, brightCyan, brightWhite,
    extendedAnsi: [...TERMINAL_ANSI_PALETTE.slice(16)],
  };
}

/**
 * Call back once per theme application, and never for anything else.
 *
 * Colours reach the document as inline custom properties, so observing the
 * whole `style` attribute would also fire for zoom and every other unrelated
 * write. In the predecessor that coupling made a single font change reflow and
 * re-rasterise every open terminal at once, so the host publishes one counter
 * and this is the only thing worth watching.
 */
export function observeTerminalTheme(root: HTMLElement, onChange: () => void): () => void {
  const observer = new MutationObserver((records) => {
    if (records.some((record) => record.attributeName === "data-theme-epoch")) onChange();
  });
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme-epoch"] });
  return () => observer.disconnect();
}

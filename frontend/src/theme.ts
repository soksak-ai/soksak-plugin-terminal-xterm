// The terminal has no palette of its own.
//
// Holding one is how a terminal ends up dark inside a light window: two
// authorities for the same colour, and only the host hears that the theme
// changed. These functions read the host's slots instead.

/** What xterm needs, expressed in the host's vocabulary. */
export interface TerminalTheme {
  background: string;
  foreground: string;
  cursor: string;
  /** The glyph under the block cursor: the surface it sits on. */
  cursorAccent: string;
  selectionBackground: string;
}

const slot = (root: HTMLElement, name: string): string =>
  getComputedStyle(root).getPropertyValue(`--${name}`).trim();

/**
 * Read the current terminal colours from the host token slots.
 *
 * The pane surface is `card`, not `bg`: the terminal fills a pane, and a pane
 * sits on the window background rather than being it.
 */
export function readTerminalTheme(root: HTMLElement = document.documentElement): TerminalTheme {
  const background = slot(root, "card");
  return {
    background,
    foreground: slot(root, "fg"),
    cursor: slot(root, "acc"),
    cursorAccent: background,
    selectionBackground: slot(root, "fg3"),
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

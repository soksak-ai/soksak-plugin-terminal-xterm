// @vitest-environment jsdom
// The mounted view opens a session for its pane, and bytes from that session
// reach the screen.
//
// The two halves are proven apart: the host's command surface drives a real
// shell (Go), and this package's writer serialises what it is given. The join
// is this file — a mounted terminal opens through the host's PTY capability
// with its pane and size, and subscribes for that session's bytes.
import { describe, expect, it, vi } from "vitest";

import { mountTerminal, type TerminalBinding } from "./terminal";

// jsdom has no matchMedia, and xterm calls it while it sets up its
// renderer. Supplying it here keeps the failure about this package rather than
// about the environment.
vi.stubGlobal("matchMedia", (query: string) => ({
  matches: false,
  media: query,
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  addListener: () => undefined,
  removeListener: () => undefined,
  onchange: null,
  dispatchEvent: () => false,
}));

// jsdom has no ResizeObserver either. The view observes its host to refit
// on layout changes; nothing in these assertions depends on a resize firing.
let resizeCallback: ResizeObserverCallback | null = null;
vi.stubGlobal("ResizeObserver", class {
  constructor(callback: ResizeObserverCallback) { resizeCallback = callback; }
  observe() {}
  unobserve() {}
  disconnect() {}
});

const SESSION = 42;

function mountedHost(): HTMLElement {
  const host = document.createElement("div");
  // xterm measures its host. jsdom reports zero for everything, so the sizes
  // that decide whether a fit runs are declared here.
  Object.defineProperty(host, "clientWidth", { value: 800, configurable: true });
  Object.defineProperty(host, "clientHeight", { value: 600, configurable: true });
  document.body.appendChild(host);
  return host;
}

function binding(overrides: Partial<TerminalBinding> = {}): TerminalBinding {
  return {
    open: vi.fn(async () => SESSION),
    write: vi.fn(async () => {}),
    resize: vi.fn(async () => {}),
    close: vi.fn(async () => {}),
    closeWindow: vi.fn(async () => {}),
    onData: vi.fn(() => ({ dispose: () => undefined })),
    registerIo: vi.fn(() => ({ dispose: () => undefined })),
    traceInput: vi.fn(async () => {}),
    paneAlive: vi.fn(async () => false),
    sidecarRequest: vi.fn(async () => ({ ok: true, data: {} })),
    ...overrides,
  };
}

// The open runs on the next frame: a terminal that opened before layout would
// ask for a size nothing had measured.
async function nextFrame(): Promise<void> {
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await Promise.resolve();
}

describe("a mounted terminal", () => {
  it("paints a live sidecar snapshot before resuming at its exact sequence", async () => {
    const order: string[] = [];
    let reportOpen!: () => void;
    const opened = new Promise<void>((resolve) => { reportOpen = resolve; });
    const open = vi.fn(async (...args: unknown[]) => {
      order.push(`open:${JSON.stringify(args[3])}`);
      reportOpen();
      return SESSION;
    });
    const warm = binding({ open }) as TerminalBinding & {
      paneAlive(paneId: string): Promise<boolean>;
      sidecarRequest(request: Record<string, unknown>): Promise<Record<string, unknown>>;
    };
    warm.paneAlive = vi.fn(async () => true);
    warm.sidecarRequest = vi.fn(async (request) => {
      order.push(String(request.op));
      if (request.op === "rehydrate") {
        return {
          ok: true,
          data: { paint: btoa("__warm_screen__"), uptoSeq: 37, altActive: false },
        };
      }
      return { ok: true, data: {} };
    });

    const host = mountedHost();
    const screen = mountTerminal(host, "pan-warm", warm);
    await opened;

    expect(order).toEqual(["resize", "rehydrate", 'open:{"fromSeq":37}']);
    expect(screen.read()).toContain("__warm_screen__");
    // jsdom has no canvas renderer, so parsing is the last observable phase in
    // this unit test. A running WebKit view advances this to "warm" only from
    // xterm's onRender event.
    expect(host.querySelector<HTMLElement>('[data-node="screen"]')?.dataset.terminalRestore)
      .toBe("buffered");
    screen.stop();
  });

  it("opens a fresh pane before registering it with the restore sidecar", async () => {
    const order: string[] = [];
    const fresh = binding({
      open: vi.fn(async () => {
        order.push("open");
        return SESSION;
      }),
    }) as TerminalBinding & {
      paneAlive(paneId: string): Promise<boolean>;
      sidecarRequest(request: Record<string, unknown>): Promise<Record<string, unknown>>;
    };
    fresh.paneAlive = vi.fn(async () => false);
    fresh.sidecarRequest = vi.fn(async (request) => {
      order.push(String(request.op));
      return { ok: true, data: {} };
    });

    const screen = mountTerminal(mountedHost(), "pan-fresh", fresh);
    await nextFrame();
    await Promise.resolve();

    expect(order).toEqual(["open", "ensureSession"]);
    screen.stop();
  });

  it("opens from the mount event even when animation frames are suspended", async () => {
    let reportOpen!: () => void;
    const opened = new Promise<void>((resolve) => { reportOpen = resolve; });
    const open = vi.fn(async () => {
      reportOpen();
      return SESSION;
    });
    const screen = mountTerminal(mountedHost(), "pan-background", binding({ open }));

    await opened;

    expect(open).toHaveBeenCalledTimes(1);
    screen.stop();
  });

  it("focuses the canonical textarea and releases it before transfer", () => {
    const host = mountedHost();
    const screen = mountTerminal(host, "pan-focus", binding());
    const input = host.querySelector<HTMLTextAreaElement>('[data-node="input"]')!;

    expect(screen.focus()).toBe(true);
    expect(document.activeElement).toBe(input);
    screen.prepareFocusTransfer();
    expect(document.activeElement).not.toBe(input);
    screen.stop();
  });

  it("flushes non-standard WebKit preedit before focus leaves", async () => {
    const write = vi.fn(async () => {});
    const host = mountedHost();
    const screen = mountTerminal(host, "pan-compose", binding({ write }));
    await nextFrame();
    const input = host.querySelector<HTMLTextAreaElement>('[data-node="input"]')!;
    input.dispatchEvent(new InputEvent("input", {
      data: "\ud55c", inputType: "insertReplacementText", bubbles: true,
    }));

    screen.prepareFocusTransfer();
    await Promise.resolve();
    expect(write).toHaveBeenCalledWith(SESSION, "\ud55c");
    screen.stop();
  });

  it("exposes its screen and IME input as plugin-owned DOM addresses", () => {
    const host = mountedHost();
    const screen = mountTerminal(host, "pan-input", binding());
    expect(host.querySelector<HTMLElement>('[data-node="screen"]')).not.toBeNull();
    expect(host.querySelector<HTMLElement>('[data-node="input"]')?.tagName).toBe("TEXTAREA");
    screen.stop();
  });

  it("coalesces a resize burst to one fit per display frame", async () => {
    const resize = vi.fn(async () => {});
    const screen = mountTerminal(mountedHost(), "pan-resize", binding({ resize }));
    await nextFrame();
    const before = resize.mock.calls.length;

    for (let index = 0; index < 10; index += 1) {
      resizeCallback?.([], {} as ResizeObserver);
    }
    expect(resize.mock.calls.length).toBe(before);
    await nextFrame();
    expect(resize.mock.calls.length).toBe(before + 1);
    screen.stop();
  });

  it("opens a session for the pane it was mounted for", async () => {
    const open = vi.fn(async () => SESSION);
    const screen = mountTerminal(mountedHost(), "pan-aaaaaa", binding({ open }));

    await nextFrame();

    expect(open).toHaveBeenCalledTimes(1);
    const [pane, cols, rows] = open.mock.calls[0] as unknown as [string, number, number];
    expect(pane).toBe("pan-aaaaaa");
    expect(cols).toBeGreaterThan(0);
    expect(rows).toBeGreaterThan(0);

    screen.stop();
  });

  it("closes the session it opened when the view goes away", async () => {
    const close = vi.fn(async () => {});
    const screen = mountTerminal(mountedHost(), "pan-bbbbbb", binding({ close }));

    await nextFrame();
    screen.stop();
    await Promise.resolve();

    expect(close).toHaveBeenCalledWith(SESSION);
  });

  it("subscribes for bytes on the session it opened, and only once it exists", async () => {
    // The handle is what addresses the bytes. Subscribing before the session
    // exists would name nothing, and the first output would be lost with
    // nothing reporting it.
    const onData = vi.fn(() => ({ dispose: () => undefined }));
    const screen = mountTerminal(mountedHost(), "pan-cccccc", binding({ onData }));

    expect(onData).not.toHaveBeenCalled();
    await nextFrame();

    expect(onData).toHaveBeenCalledTimes(1);
    const [session] = onData.mock.calls[0] as unknown as [number];
    expect(session).toBe(SESSION);

    screen.stop();
  });

  it("stops receiving bytes when the view goes away", async () => {
    const dispose = vi.fn();
    const screen = mountTerminal(mountedHost(), "pan-dddddd", binding({
      onData: vi.fn(() => ({ dispose })),
    }));

    await nextFrame();
    screen.stop();

    expect(dispose).toHaveBeenCalled();
  });

  it("measures the actual xterm write queue without writing to the shell", async () => {
    const write = vi.fn(async () => {});
    const screen = mountTerminal(mountedHost(), "pan-benchmark", binding({ write }));
    await nextFrame();
    const before = screen.read();

    const report = await screen.benchmark({
      mode: "printable",
      bytes: 4096,
      repetitions: 3,
    });

    expect(report).toMatchObject({
      engine: "xterm",
      mode: "printable",
      bytesPerSample: 4096,
      repetitions: 3,
      totalBytes: 12_288,
    });
    expect(report.samplesMs).toHaveLength(3);
    expect(report.cols).toBeGreaterThan(0);
    expect(report.rows).toBeGreaterThan(0);
    expect(screen.read()).toBe(before);
    expect(write).not.toHaveBeenCalled();
    screen.stop();
  });
});

describe("the host's view of a mounted terminal", () => {
  it("registers this screen so the host can read it and type into it", async () => {
    // Without it term.read, term.send and app.terminal.readBuffer answer "not
    // ready" for a pane that is running — the screen is this plugin's and
    // the host has no other way in (measured 2026-08-15).
    const registerIo = vi.fn(() => ({ dispose: () => undefined }));
    const write = vi.fn(async () => {});
    const screen = mountTerminal(mountedHost(), "tab-eeeeee", binding({ registerIo, write }));

    await nextFrame();

    expect(registerIo).toHaveBeenCalledTimes(1);
    const [pane, io] = registerIo.mock.calls[0] as unknown as [
      string,
      { readBuffer: (lines?: number) => string; sendInput: (data: string) => void },
    ];
    expect(pane).toBe("tab-eeeeee");
    expect(typeof io.readBuffer()).toBe("string");

    io.sendInput("ls\r");
    await Promise.resolve();
    expect(write).toHaveBeenCalledWith(SESSION, "ls\r");

    screen.stop();
  });
});

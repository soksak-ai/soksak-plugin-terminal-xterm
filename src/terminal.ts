// xterm.js 터미널 — app.pty.* 로 코어 PTY 구동.
// invoke() / Channel / 코어 내부 모듈 비의존.
import { Terminal } from "@xterm/xterm";
import { Unicode11Addon } from "@xterm/addon-unicode11";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import { WebglAddon } from "@xterm/addon-webgl";
import type { PtyApi, Disposable } from "./host";

// VSCode FlowControlConstants.CharCountAckSize 와 동일.
const FLOW_ACK_SIZE = 5000;

// darkTheme (코어 소스 비의존).
const DARK_THEME = {
  foreground: "#cccccc",
  background: "#1e1e1e",
  cursor: "#ffffff",
  cursorAccent: "#1e1e1e",
  selectionBackground: "#264f78",
  selectionInactiveBackground: "#3a3d41",
  black: "#000000",
  red: "#cd3131",
  green: "#0dbc79",
  yellow: "#e5e510",
  blue: "#2472c8",
  magenta: "#bc3fbc",
  cyan: "#11a8cd",
  white: "#e5e5e5",
  brightBlack: "#666666",
  brightRed: "#f14c4c",
  brightGreen: "#23d18b",
  brightYellow: "#f5f543",
  brightBlue: "#3b8eea",
  brightMagenta: "#d670d6",
  brightCyan: "#29b8db",
  brightWhite: "#ffffff",
};

export interface TerminalInstance {
  /** xterm.js 가 마운트된 컨테이너 div. */
  element: HTMLElement;
  /** PTY 세션 정리 + xterm dispose. */
  dispose(): Promise<void>;
  /** xterm 포커스. */
  focus(): void;
  /** 텍스트를 PTY 로 직접 전송. */
  sendInput(data: string): void;
  /** 화면 + 스크롤백 텍스트 직렬화(끝에서 lines 줄, 기본=전체). */
  readBuffer(lines?: number): string;
  /** xterm 화면 지우기. */
  clear(): void;
  /** 사용자 설정(글꼴/커서/스크롤백) 라이브 적용 — app.settings.onChange 에서 호출. */
  applySettings(s: TermSettings): void;
}

// 터미널 플러그인이 *소유·적용*하는 설정(manifest contributes.configuration 와 1:1). 코어 settings 아님.
export interface TermSettings {
  fontFamily?: string;
  fontSize?: number;
  scrollback?: number;
  cursorBlink?: boolean;
  cursorStyle?: "block" | "underline" | "bar";
  // xterm 렌더러 백엔드. webgl=GPU(처리량 우선, 기본). dom=리사이즈 정확성(WKWebView 합성 stretch 회피).
  // dom/webgl 은 xterm 구현 전용 개념이라 xterm 스코프로 명명한다.
  xtermRenderer?: "webgl" | "dom";
}

const DEFAULT_FONT =
  '"JetBrains Mono", "SF Mono", "Cascadia Code", Menlo, Consolas, "Courier New", monospace';

export async function createTerminalInstance(opts: {
  pty: PtyApi;
  cwd?: string;
  shell?: string;
  paneId?: number | null;
  settings?: TermSettings;
}): Promise<TerminalInstance> {
  const { pty, cwd, shell, paneId, settings } = opts;

  // 폰트 선로드 — open() 전에 보장하지 않으면 셀 정렬이 깨진다.
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      /* 폰트 API 미지원 시 무시 */
    }
  }

  // 설정은 플러그인 소유(manifest config) — app.settings 에서 읽어 호출부가 주입. 미지정은 기본값.
  const term = new Terminal({
    allowProposedApi: true,
    fontFamily: settings?.fontFamily || DEFAULT_FONT,
    fontSize: settings?.fontSize ?? 13,
    lineHeight: 1.0,
    letterSpacing: 0,
    scrollback: settings?.scrollback ?? 10000,
    cursorBlink: settings?.cursorBlink ?? true,
    cursorStyle: settings?.cursorStyle ?? "block",
    drawBoldTextInBrightColors: true,
    minimumContrastRatio: 1,
    theme: DARK_THEME,
  });

  // 애드온: Unicode11, WebLinks, Clipboard
  term.loadAddon(new Unicode11Addon());
  term.unicode.activeVersion = "11";
  term.loadAddon(
    new WebLinksAddon((_event, uri) => {
      // 플러그인 컨텍스트엔 opener 없음 → window.open 으로 OS 기본 브라우저 위임.
      window.open(uri, "_blank");
    }),
  );
  term.loadAddon(new ClipboardAddon());

  // 컨테이너 div 생성 + xterm 마운트
  const container = document.createElement("div");
  container.className = "sk-term-xterm";
  container.setAttribute("data-node", "terminal");
  container.style.cssText = "width:100%;height:100%;overflow:hidden;";

  term.open(container);

  // 렌더러: 설정(xtermRenderer)으로 WebGL(기본) ↔ DOM 라이브 전환. 애드온 미적재 = 내장 DOM
  // 렌더러. WebGL addon 은 dispose 시 DOM 으로 복귀하므로 런타임 전환이 안전하다(컨텍스트 손실
  // 폴백과 동일 경로). dom 은 macOS WKWebView 라이브 리사이즈에서 글자 stretch 가 없어 정확하다.
  let webgl: WebglAddon | undefined;
  const setRenderer = (mode: "webgl" | "dom") => {
    if (mode === "webgl") {
      if (webgl) return; // 이미 WebGL
      try {
        const addon = new WebglAddon();
        addon.onContextLoss(() => {
          addon.dispose();
          if (webgl === addon) webgl = undefined; // 컨텍스트 손실 → DOM 폴백
        });
        term.loadAddon(addon);
        webgl = addon;
      } catch (e) {
        console.warn("[sk-terminal] WebGL 렌더러 사용 불가 — DOM 유지:", e);
        webgl = undefined;
      }
    } else if (webgl) {
      webgl.dispose(); // → xterm 내장 DOM 렌더러로 복귀
      webgl = undefined;
    }
  };
  setRenderer(settings?.xtermRenderer ?? "webgl");

  // 직접 fit — 코어 createTerminal.ts 와 동일 방식(FitAddon 의 14px 스크롤바 여백 없음).
  const fitTerminal = () => {
    if (container.clientWidth === 0 || container.clientHeight === 0) return;
    const core = (term as unknown as { _core?: { _renderService?: { dimensions?: { css?: { cell?: { width?: number; height?: number } } } } } })._core;
    const cell = core?._renderService?.dimensions?.css?.cell;
    if (!cell?.width || !cell?.height) return;
    const cols = Math.max(2, Math.floor(container.clientWidth / cell.width));
    const rows = Math.max(1, Math.floor(container.clientHeight / cell.height));
    if (cols !== term.cols || rows !== term.rows) {
      term.resize(cols, rows);
    }
  };

  fitTerminal();
  requestAnimationFrame(() => {
    try { fitTerminal(); } catch { /* 0 크기 컨테이너 무시 */ }
  });

  // PTY 스폰 — spawn() 전에 disposed 되면 id 를 즉시 닫는다(async race 처리).
  let disposed = false;
  let ptyId = 0;
  let ackPending = 0;

  const spawnPromise = pty.spawn({
    cols: term.cols,
    rows: term.rows,
    cwd: cwd ?? undefined,
    shell: shell ?? undefined,
    paneId: typeof paneId === "number" ? paneId : undefined,
  });

  // PTY 출력 구독 : onData 는 스폰 전 버퍼를 보유하므로 순서 보장.
  // ptyId 가 확정되기 전에 등록할 수 없어 spawn 완료 후 연결.
  let dataSub: Disposable | null = null;

  ptyId = await spawnPromise;
  if (disposed) {
    // 언마운트가 spawn 보다 먼저 일어난 경우 — 즉시 닫는다.
    pty.close(ptyId).catch(() => {});
    term.dispose();
    webgl?.dispose();
    return {
      element: container,
      dispose: async () => {},
      focus: () => {},
      sendInput: () => {},
      readBuffer: () => "",
      clear: () => {},
      applySettings: () => {},
    };
  }

  dataSub = pty.onData(ptyId, (bytes: Uint8Array) => {
    term.write(bytes, () => {
      ackPending += bytes.length;
      if (ackPending >= FLOW_ACK_SIZE) {
        pty.ack(ptyId, ackPending).catch(() => {});
        ackPending = 0;
      }
    });
  });

  // 입력: xterm → PTY
  const inputDisp = term.onData((data: string) => {
    if (ptyId !== 0) {
      pty.write(ptyId, data).catch(() => {});
    }
  });

  // ResizeObserver: 컨테이너 크기 변화 → fit → PTY resize.
  const FIT_THROTTLE_MS = 50;
  let lastFitAt = 0;
  let fitTimer: ReturnType<typeof setTimeout> | undefined;

  const safeFit = () => {
    try {
      lastFitAt = performance.now();
      const before = `${term.cols}x${term.rows}`;
      fitTerminal();
      if (`${term.cols}x${term.rows}` !== before && ptyId !== 0) {
        term.refresh(0, term.rows - 1);
        pty.resize(ptyId, term.cols, term.rows).catch(() => {});
      }
    } catch { /* 0 크기 등 무시 */ }
  };

  const scheduleFit = () => {
    const since = performance.now() - lastFitAt;
    if (since >= FIT_THROTTLE_MS) {
      if (fitTimer !== undefined) { clearTimeout(fitTimer); fitTimer = undefined; }
      safeFit();
    } else if (fitTimer === undefined) {
      fitTimer = setTimeout(() => { fitTimer = undefined; safeFit(); }, FIT_THROTTLE_MS - since);
    }
  };

  const resizeObserver = new ResizeObserver(() => scheduleFit());
  resizeObserver.observe(container);

  const dispose = async () => {
    disposed = true;
    clearTimeout(fitTimer as unknown as number);
    resizeObserver.disconnect();
    inputDisp.dispose();
    dataSub?.dispose();
    if (ptyId !== 0) {
      await pty.close(ptyId).catch(() => {});
    }
    webgl?.dispose();
    term.dispose();
  };

  return {
    element: container,
    dispose,
    focus: () => term.focus(),
    sendInput: (data: string) => {
      if (ptyId !== 0) pty.write(ptyId, data).catch(() => {});
    },
    readBuffer: (lines?: number) => {
      const buf = term.buffer.active;
      const line = (i: number) => buf.getLine(i)?.translateToString(true) ?? "";
      let end = buf.length - 1;
      while (end >= 0 && line(end) === "") end--;
      if (end < 0) return "";
      const want = lines && lines > 0 ? Math.min(lines, end + 1) : end + 1;
      const out: string[] = [];
      for (let i = end + 1 - want; i <= end; i++) out.push(line(i));
      return out.join("\n");
    },
    clear: () => term.clear(),
    applySettings: (s: TermSettings) => {
      // 라이브 적용 — xterm 옵션을 갱신하고 재핏(셀 크기 변화 시 PTY resize 는 fitTerminal 내부에서).
      if (s.fontFamily) term.options.fontFamily = s.fontFamily;
      if (s.fontSize != null) term.options.fontSize = s.fontSize;
      if (s.scrollback != null) term.options.scrollback = s.scrollback;
      if (s.cursorBlink != null) term.options.cursorBlink = s.cursorBlink;
      if (s.cursorStyle) term.options.cursorStyle = s.cursorStyle;
      if (s.xtermRenderer) setRenderer(s.xtermRenderer); // 렌더러 라이브 전환(변화 없으면 no-op)
      try {
        fitTerminal();
      } catch {
        /* 0 크기 컨테이너 무시 */
      }
      term.refresh(0, term.rows - 1); // 렌더러 전환·설정 변경 후 전체 재페인트
    },
  };
}

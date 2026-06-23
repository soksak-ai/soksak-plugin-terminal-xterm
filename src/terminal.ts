// xterm.js 터미널 — app.pty.* 로 코어 PTY 구동.
// invoke() / Channel / 코어 내부 모듈 비의존.
import { Terminal } from "@xterm/xterm";
import { Unicode11Addon } from "@xterm/addon-unicode11";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import { WebglAddon } from "@xterm/addon-webgl";
import type { PtyApi, Disposable } from "./host";
import { themeFor } from "./theme";
import { WebkitImeAddon } from "./vendor/xterm-addon-webkit-ime";

// VSCode FlowControlConstants.CharCountAckSize 와 동일.
const FLOW_ACK_SIZE = 5000;

export interface TerminalInstance {
  /** xterm.js 가 마운트된 컨테이너 div. */
  element: HTMLElement;
  /** PTY 세션 정리 + xterm dispose. */
  dispose(): Promise<void>;
  /** xterm 포커스. */
  focus(): void;
  /** 컨테이너 크기에 맞춰 즉시 fit 후 PTY 에 크기 전파(포커스/노출/이동 직후 경로). */
  fit(): void;
  /** 텍스트를 PTY 로 직접 전송. */
  sendInput(data: string): void;
  /** 텍스트를 PTY 로 붙여넣기(bracketed paste 모드면 자동 래핑). 파일 드래그 경로 주입용. */
  paste(text: string): void;
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
  paneId?: string | null;
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
    // 앱 테마(dataset.themeMode + :root --bg)를 상속. 아래 MutationObserver 가 라이브 추종.
    theme: themeFor(),
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

  // 앱 테마 라이브 추종 — 앱이 발행하는 DOM 계약(documentElement.dataset.themeMode + :root --bg)
  // 변화를 MutationObserver 로 관찰해 xterm 테마를 재빌드·적용한다(폴링 없음). data-theme-mode 는
  // 모드(light/dark) 전환을, style 은 --bg CSS 변수 갱신(같은 모드 내 색 변경)을 잡는다.
  // 코어 createTerminal.setTheme 처럼 테마 교체 시 WebGL 텍스처 아틀라스(글리프 색 캐시)를 비운다.
  const applyTheme = () => {
    term.options.theme = themeFor();
    webgl?.clearTextureAtlas();
    term.refresh(0, term.rows - 1);
  };
  const themeObserver = new MutationObserver(() => applyTheme());
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme-mode", "style"],
  });

  // 직접 fit — 코어 createTerminal.ts 와 동일 방식(FitAddon 의 14px 스크롤바 여백 없음).
  const fitTerminal = () => {
    // 숨겨진 탭(display:none)은 0 크기 → fit 하면 2열로 줄어드니 건너뛴다.
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

  // 입력을 PTY 로 쓰는 단일 통로(IME 애드온 onData·OSC 11 응답·키 주입 공용).
  const writeToPty = (data: string) => {
    if (ptyId !== 0) {
      pty.write(ptyId, data).catch(() => {});
    }
  };

  // OSC 11 (배경색 질의 응답): 앱이 `ESC ] 11 ; ?` 로 물으면 현재 테마 배경색을
  // XParseColor 형식(rgb:RRRR/GGGG/BBBB)으로 응답한다. Claude Code 등 'auto' 테마
  // 앱이 우리 라이트/다크 모드를 감지/추종한다. 테마 토글 시 term.options.theme.background
  // 가 바뀌므로 응답도 따라 바뀐다.
  term.parser.registerOscHandler(11, (data) => {
    if (data !== "?") {
      return false; // 색 설정 등은 xterm 기본 처리에 위임
    }
    const bg = (term.options.theme?.background as string | undefined) ?? "#1e1e1e";
    const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(bg);
    if (m) {
      const c = (h: string) => `${h}${h}`; // 8bit → 16bit (예: 1e → 1e1e)
      writeToPty(`\x1b]11;rgb:${c(m[1])}/${c(m[2])}/${c(m[3])}\x1b\\`);
    }
    return true;
  });

  // WKWebView(Tauri/Safari) 한글·CJK IME 보정.
  // WebKit은 marked-text 상태에 따라 IME 입력을 비표준 경로(insertReplacementText,
  // compositionend 없음)로 흘려보내 xterm이 부분 자모를 떨어뜨린다. 이 애드온이
  // 비표준 경로를 가로채 조합 미리보기를 그리고, 완성 글자만 PTY로 보낸다.
  const ime = new WebkitImeAddon({ onData: writeToPty });
  term.loadAddon(ime as unknown as Parameters<Terminal["loadAddon"]>[0]);

  // 이미지 붙여넣기(⌘V): 클립보드에 이미지만 있고 텍스트가 없으면, TUI 앱(Claude Code
  // 등)이 OS 클립보드를 직접 읽도록 "빈 bracketed paste"(ESC[200~ ESC[201~)만 보낸다.
  // Claude Code 는 macOS 에서 빈 paste 를 신호로 osascript 로 클립보드 이미지를 읽는다.
  // bracketed paste 모드가 꺼진 셸 프롬프트에서는 보낼 게 없으므로 xterm 기본(무동작)에 맡긴다.
  const onPaste = (e: ClipboardEvent) => {
    const dt = e.clipboardData;
    if (!dt) return;
    const items = Array.from(dt.items ?? []);
    const files = Array.from(dt.files ?? []);
    const hasImage =
      items.some((it) => it.kind === "file" && it.type.startsWith("image/")) ||
      files.some((f) => f.type.startsWith("image/"));
    const text = dt.getData("text/plain");
    if (hasImage && !text && term.modes.bracketedPasteMode) {
      e.preventDefault();
      e.stopPropagation();
      writeToPty("\x1b[200~\x1b[201~");
    }
  };
  container.addEventListener("paste", onPaste, true);

  const spawnPromise = pty.spawn({
    cols: term.cols,
    rows: term.rows,
    cwd: cwd ?? undefined,
    shell: shell ?? undefined,
    paneId: paneId ?? undefined,
  });

  // PTY 출력 구독 : onData 는 스폰 전 출력도 버퍼링하므로 순서 보장.
  // ptyId 가 확정되기 전에 등록할 수 없어 spawn 완료 후 연결.
  let dataSub: Disposable | null = null;

  ptyId = await spawnPromise;
  if (disposed) {
    // 언마운트가 spawn 보다 먼저 일어난 경우 — 즉시 닫는다.
    pty.close(ptyId).catch(() => {});
    container.removeEventListener("paste", onPaste, true);
    themeObserver.disconnect();
    term.dispose();
    webgl?.dispose();
    return {
      element: container,
      dispose: async () => {},
      focus: () => {},
      fit: () => {},
      sendInput: () => {},
      paste: () => {},
      readBuffer: () => "",
      clear: () => {},
      applySettings: () => {},
    };
  }

  dataSub = pty.onData(ptyId, (bytes: Uint8Array) => {
    term.write(bytes, () => {
      // 콜백 = 파서가 데이터를 처리 완료한 시점. 누적 후 5k 마다 ack.
      ackPending += bytes.length;
      if (ackPending >= FLOW_ACK_SIZE) {
        pty.ack(ptyId, ackPending).catch(() => {});
        ackPending = 0;
      }
    });
  });

  // 입력: xterm → PTY. IME 조합 중 누출되는 부분 자모는 shouldSkip 으로 거른다.
  const inputDisp = term.onData((data: string) => {
    const skip = ime.shouldSkip(data);
    if (!skip) {
      // 조합 중 외부 입력(구두점/ASCII 등)이 들어오면 pending 음절을 먼저 PTY로
      // 보내 순서를 보장한다(자+. → 자. , 하+? → 하?).
      //
      // [HARD] 단 ESC 시퀀스(CPR/DA/OSC 등)는 flush 대상이 아니다 — claude 같은 TUI 는
      // 커서 위치(DSR `ESC[6n`)를 끊임없이 질의하고, xterm 이 CPR(`ESC[…R`)로 자동 응답
      // 하는데 그 응답이 이 onData 로 흐른다. flushPending 이 그 응답마다 조합 중인 한글을
      // 강제 flush 하면 → 첫 자모만 나간 자모 누수(ㅎ)·음절 중복이 발생한다.
      // 사용자 평문 입력(비 ESC)만 flush 한다.
      if (data.charCodeAt(0) !== 0x1b) ime.flushPending();
      writeToPty(data);
    }
  });

  // ResizeObserver: 컨테이너 크기 변화 → fit(스로틀) → PTY resize.
  // 치수 변화 시 term.refresh(전체 행)로 최종 폭을 깨끗이 재렌더(캔버스를 비우지 않아 깜빡임 없음),
  // syncPty 로 셸에 SIGWINCH 를 보내 정적 프롬프트도 새 폭으로 다시 그리게 한다(코어 createTerminal 동일).
  const FIT_THROTTLE_MS = 50;
  let lastFitAt = 0;
  let fitTimer: ReturnType<typeof setTimeout> | undefined;

  const syncPty = () => {
    if (ptyId !== 0) {
      pty.resize(ptyId, term.cols, term.rows).catch(() => {});
    }
  };

  const safeFit = () => {
    try {
      lastFitAt = performance.now();
      const before = `${term.cols}x${term.rows}`;
      fitTerminal();
      if (`${term.cols}x${term.rows}` !== before) {
        term.refresh(0, term.rows - 1);
        syncPty(); // 셸에 SIGWINCH — 정적 프롬프트도 새 폭으로 다시 그린다.
      }
    } catch { /* 0 크기 등 무시 */ }
  };

  // fit+PTY 스로틀(leading+trailing): 직전 fit 후 THROTTLE 경과면 즉시, 아니면 남은
  // 시간 뒤 1회 — 연속 드래그 중 빈도를 렌더·셸이 따라올 수준으로 제한한다.
  const scheduleFit = () => {
    const since = performance.now() - lastFitAt;
    if (since >= FIT_THROTTLE_MS) {
      if (fitTimer !== undefined) { clearTimeout(fitTimer); fitTimer = undefined; }
      safeFit();
    } else if (fitTimer === undefined) {
      fitTimer = setTimeout(() => { fitTimer = undefined; safeFit(); }, FIT_THROTTLE_MS - since);
    }
  };

  const doResize = (immediate = false) => {
    if (immediate) {
      if (fitTimer !== undefined) { clearTimeout(fitTimer); fitTimer = undefined; }
      safeFit();
      syncPty();
      return;
    }
    // 숨김 터미널(비활성 탭/뷰 — visibility:hidden 슬롯) 스킵: 창/사이드바
    // 리사이즈 때 안 보이는 터미널까지 fit+IPC 할 이유가 없다. 노출 시 fit() 이 즉시 보정한다.
    if (
      typeof container.checkVisibility === "function" &&
      !container.checkVisibility({ visibilityProperty: true })
    ) {
      return;
    }
    scheduleFit();
  };

  const resizeObserver = new ResizeObserver(() => doResize());
  resizeObserver.observe(container);

  // devicePixelRatio 변화(모니터 간 이동 등) → 렌더러 갱신 + 재fit.
  let dprCleanup: (() => void) | undefined;
  const armDprListener = () => {
    const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const handler = () => {
      term.refresh(0, term.rows - 1);
      doResize(true); // 모니터 이동 = 즉시 보정
      dprCleanup?.();
      armDprListener();
    };
    mq.addEventListener("change", handler, { once: true });
    dprCleanup = () => mq.removeEventListener("change", handler);
  };
  armDprListener();

  const dispose = async () => {
    disposed = true;
    container.removeEventListener("paste", onPaste, true);
    clearTimeout(fitTimer as unknown as number);
    resizeObserver.disconnect();
    dprCleanup?.();
    themeObserver.disconnect();
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
    // 포커스/노출/이동(appendChild) 직후 호출되는 경로 — 지금 맞춰야 한다.
    fit: () => doResize(true),
    sendInput: (data: string) => writeToPty(data),
    paste: (text: string) => term.paste(text),
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
      // 라이브 적용 — xterm 옵션을 갱신하고 재fit(셀 크기 변화 시 PTY resize 는 doResize 내부에서).
      if (s.fontFamily) term.options.fontFamily = s.fontFamily;
      if (s.fontSize != null) term.options.fontSize = s.fontSize;
      if (s.scrollback != null) term.options.scrollback = s.scrollback;
      if (s.cursorBlink != null) term.options.cursorBlink = s.cursorBlink;
      if (s.cursorStyle) term.options.cursorStyle = s.cursorStyle;
      if (s.xtermRenderer) setRenderer(s.xtermRenderer); // 렌더러 라이브 전환(변화 없으면 no-op)
      webgl?.clearTextureAtlas();
      doResize(true); // 폰트 크기 변경 → 셀 치수 변화 → 즉시 재fit + PTY resize
      term.refresh(0, term.rows - 1); // 렌더러 전환·설정 변경 후 전체 재페인트
    },
  };
}

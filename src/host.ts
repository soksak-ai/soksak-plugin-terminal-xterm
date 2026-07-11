// 코어 플러그인 API 중 terminal 플러그인이 쓰는 표면만 선언.
// soksak-plugin-spec v1 의 SoksakPluginApi 와 동형 — 별도 repo, 코어 소스 비의존.
// 미선언 권한 표면은 런타임에 undefined.

export interface Disposable {
  dispose(): void;
}

// 코어 viewRegistry.PluginViewContext 와 동형.
export interface PluginViewContext {
  projectId: string;
  root: string | null;
  paneId: string | null;
  viewId: string | null;
  // 마운트 시 1회 자동 실행할 명령(에이전트 프로그램 — 터미널이 PTY 로 실행). 없으면 null.
  command: string | null;
  /** 복원 seam(B3) — 재시작 복원 마운트면 관찰됐던 런타임(cwd). 새 뷰는 null. */
  restore?: { cwd: string | null } | null;
  setBadge: (badge: number | "dot" | null) => void;
  setStatus: (status: { code: string; message?: string } | null) => void;
  setTitle: (title: string) => void;
}

export interface PluginViewProvider {
  mount(container: HTMLElement, ctx: PluginViewContext): void;
  unmount?(container: HTMLElement): void;
}

export interface ParamSpec {
  type: string;
  description?: string;
  required?: boolean;
}

export interface CommandHint {
  cmd: string;
  why: string;
}

export interface PluginCommandSpec {
  description: string;
  triggers?: Record<string, string>;
  params?: Record<string, ParamSpec>;
  returns?: string;
  message?: (data: any) => string;
  /** Up to 3 suggested next commands, worded suggestively ("...할 수 있습니다"). */
  hint?: (data: any, ctx: PluginContext) => CommandHint[];
  handler: (params: Record<string, unknown>) => Promise<object> | object;
}

export interface CommandOutcome {
  ok: boolean;
  [k: string]: unknown;
}

// app.pty — 코어 PTY 구동 표면 (pty 권한 필요).
export interface PtyApi {
  /** PTY 생성 + 셸 스폰. 반환값 = ptyId. paneId 는 관찰 substrate·sok CLI 타깃 키(문자열 —
   *  코어가 SOKSAK_PANE 으로 주입하고 app.terminal/command 관찰을 이 키로 묶는다). */
  spawn(opts: {
    cols: number;
    rows: number;
    cwd?: string;
    shell?: string;
    paneId?: string;
  }): Promise<number>;
  /** ptyId 에 텍스트/바이트 전송(키 입력). */
  write(id: number, data: string | Uint8Array): Promise<void>;
  /** 터미널 크기 변경 → PTY SIGWINCH. */
  resize(id: number, cols: number, rows: number): Promise<void>;
  /** 플로우 컨트롤 ACK (처리 완료 바이트 수). */
  ack(id: number, bytes: number): Promise<void>;
  /** PTY 닫기 + 정리. */
  close(id: number): Promise<void>;
  /** PTY 출력 구독(스폰 전 출력도 버퍼링 → 손실 없음). 반환=해지. */
  onData(id: number, cb: (data: Uint8Array) => void): Disposable;
  /** 이 pane 의 스폰이 PTY 세션 화면을 복원했는가(데몬 재부착 replay | cold 체크포인트 inject).
   *  코어가 spawn 반환 전 set 하므로 spawn 을 await 한 뒤 조회하면 레이스-프리다. 참이면 그
   *  화면이 뷰포트 권위 — 복원 뷰는 명령-블록 repaint(이력 floor)를 겹치면 복원 프레임을
   *  뷰포트 밖으로 민다. */
  wasScreenRestored(paneId: string): boolean;
  /** 셸 바이너리 경로 확인. 없으면 null. */
  which(bin: string): Promise<string | null>;
  /** 이 paneId 의 IO 핸들러(화면 읽기·입력 쓰기)를 코어 substrate 에 등록 → app.terminal.
   *  readBuffer/sendText 가 이 터미널에 닿는다. 마운트 시 등록, 언마운트 시 해지(Disposable). */
  registerIo(
    paneId: string,
    io: { readBuffer: (lines?: number) => string; sendInput: (data: string) => void },
  ): Disposable;
}

export interface PluginApi {
  pluginId: string;
  locale: () => string;
  commands?: {
    register: (name: string, spec: PluginCommandSpec) => Disposable;
    execute: (name: string, params?: Record<string, unknown>) => Promise<CommandOutcome>;
  };
  events: {
    on: (event: string, fn: (payload: unknown) => void) => Disposable;
  };
  // 활동 로그 자기기술 발행 — 터미널 명령 활동을 자기 i18n 문장으로 싣는다(코어 브리지 아님).
  activity: {
    publish: (
      kind: string,
      entry: { message: string; speak?: string } & Record<string, unknown>,
    ) => void;
  };
  // app.data — 코어 영속 저장(records). 터미널이 명령 블록을 저장/복원·retention(R1~R5). "data" 권한 필요.
  data?: {
    define: (collection: string, opts: { indexes?: string[]; fts?: string[] }) => Promise<void>;
    put: (
      collection: string,
      doc: Record<string, unknown>,
      opts?: { scope?: string; id?: string },
    ) => Promise<string>;
    query: (
      collection: string,
      opts?: {
        scope?: string;
        where?: Record<string, unknown>;
        order?: string;
        desc?: boolean;
        limit?: number;
      },
    ) => Promise<unknown[]>;
    retentionTrim: (collection: string, scope: string, cap: number) => Promise<number>;
  };
  ui?: {
    registerView: (viewId: string, provider: PluginViewProvider) => Disposable;
  };
  pty?: PtyApi;
  bus: {
    emit: (topic: string, payload: unknown) => void;
    on: (topic: string, fn: (payload: unknown) => void) => Disposable;
  };
  project: {
    current: () => { id: string; root: string | null } | null;
  };
  settings: {
    get: (key: string) => unknown;
    all: () => Record<string, unknown>;
    onChange: (cb: (all: Record<string, unknown>) => void) => Disposable;
  };
}

export interface PluginContext {
  app: PluginApi;
  manifest: unknown;
  dir: string;
  subscriptions: Disposable[];
}

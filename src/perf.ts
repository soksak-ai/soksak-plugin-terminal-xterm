// 뷰별 성능 카운터 — PTY→화면 경로의 정수 가산만(오버헤드 ~0, 폴링 0).
// terminal.ts 의 onData/ACK/write 콜백/onRender 에서 가산하고, perf.stats 커맨드가
// pull 로 읽는다. 소비자(하니스)는 두 스냅샷의 차분으로 구간을 계산한다.

export interface TermPerfStats {
  /** PTY 출력으로 수신해 화면 경로(term.write)로 넘긴 총 바이트. */
  writtenBytes: number;
  /** 플로우 컨트롤 ACK 전송 횟수(누적 5000B 마다 1회). */
  ackSent: number;
  /** term.write 호출 → 완료 콜백까지의 누적 지연(ms, 정수 반올림) — 파싱 백로그 지표. */
  writeCbLagMs: number;
  /** xterm 렌더 프레임 수(onRender — 실제 그린 프레임만). */
  rafFrameCount: number;
  /** WebGL 렌더러 활성 여부(폴백/전환 감지). */
  webglActive: boolean;
  /** 일반 버퍼의 스크롤백 행 수(뷰포트 제외). */
  scrollbackRows: number;
}

export interface PerfCounters {
  addBytes(n: number): void;
  ackSent(): void;
  addWriteCbLag(ms: number): void;
  frame(): void;
  snapshot(live: { webglActive: boolean; scrollbackRows: number }): TermPerfStats;
}

export function createPerfCounters(): PerfCounters {
  let writtenBytes = 0;
  let acks = 0;
  let writeCbLagMs = 0;
  let frames = 0;
  return {
    addBytes(n) {
      writtenBytes += n;
    },
    ackSent() {
      acks += 1;
    },
    addWriteCbLag(ms) {
      writeCbLagMs += ms;
    },
    frame() {
      frames += 1;
    },
    snapshot(live) {
      return {
        writtenBytes,
        ackSent: acks,
        writeCbLagMs: Math.round(writeCbLagMs),
        rafFrameCount: frames,
        webglActive: live.webglActive,
        scrollbackRows: live.scrollbackRows,
      };
    },
  };
}

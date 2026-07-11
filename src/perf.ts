// 성능 관찰면(pull) — 카운터는 onData/ACK/write 콜백/onRender 에서 정수 가산만 한다(폴링 0,
// 측정 대상 무교란). perf.stats 하니스는 두 스냅샷의 차분으로 구간(throughput/파싱 백로그/프레임)을
// 계산한다. writeCbLagMs/rafFrameCount 는 페인트 포함 축, writtenBytes/ackSent 는 처리량 축이다.

export interface PerfSnapshot {
  /** onData 로 도착한 누적 바이트(처리량 분자). */
  writtenBytes: number;
  /** 보낸 ACK(플로우 컨트롤) 횟수 — FLOW_ACK_SIZE 마다 1. */
  ackSent: number;
  /** term.write 콜백까지의 누적 지연(ms, 반올림) — xterm 파싱 백로그. */
  writeCbLagMs: number;
  /** onRender 프레임 수 — 실제 재페인트 횟수. */
  rafFrameCount: number;
  /** 스냅샷 시점 라이브 값(카운터 아님) — WebGL 렌더러 활성 여부. */
  webglActive: boolean;
  /** 스냅샷 시점 라이브 값 — 일반 버퍼 스크롤백 행수. */
  scrollbackRows: number;
}

export interface PerfCounters {
  addBytes(n: number): void;
  ackSent(): void;
  addWriteCbLag(ms: number): void;
  frame(): void;
  snapshot(live: { webglActive: boolean; scrollbackRows: number }): PerfSnapshot;
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

// 성능 관찰면(pull) — 카운터는 onData/ACK/write 콜백/onRender 에서 정수 가산만 한다(폴링 0,
// 측정 대상 무교란). perf.stats 하니스는 두 스냅샷의 차분으로 구간(throughput/파싱 백로그/프레임)을
// 계산한다. writeCbLagMs/rafFrameCount 는 페인트 포함 축, writtenBytes/ackSent 는 처리량 축이다.

// PerfSnapshot 의 형태(shape)는 kit 의 TerminalRenderer 계약이 정한다 — 단일 진실. 재-export 해
// 기존 소비자(perf.stats 명령·터미널 인스턴스)가 이름으로 계속 참조하게 한다.
import type { PerfSnapshot } from "soksak-kit-terminal-common";
export type { PerfSnapshot };

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

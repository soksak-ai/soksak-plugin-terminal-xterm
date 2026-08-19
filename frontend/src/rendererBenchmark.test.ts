import { describe, expect, it } from "vitest";

import {
  createRendererPayload,
  summarizeRendererSamples,
} from "./rendererBenchmark";

describe("renderer benchmark workload", () => {
  it("creates exact deterministic byte counts for both modes", () => {
    for (const mode of ["printable", "adversarial"] as const) {
      const first = createRendererPayload(mode, 4097);
      const second = createRendererPayload(mode, 4097);
      expect(first).toHaveLength(4097);
      expect(second).toEqual(first);
    }
  });

  it("keeps printable bytes in the printable ASCII and line-control set", () => {
    const payload = createRendererPayload("printable", 8192);
    expect([...payload].every((byte) => byte === 10 || byte === 13 || (byte >= 32 && byte <= 126))).toBe(true);
  });

  it("reports exact totals and nearest-rank latency percentiles", () => {
    expect(summarizeRendererSamples([5, 1, 4, 2, 3], 1024)).toEqual({
      samplesMs: [5, 1, 4, 2, 3],
      elapsedMs: 15,
      totalBytes: 5 * 1024,
      p50Ms: 3,
      p95Ms: 5,
      maxMs: 5,
      throughputMiBps: (5 * 1024) / (1024 * 1024) / 0.015,
    });
  });

  it("refuses an empty sample set", () => {
    expect(() => summarizeRendererSamples([], 1024)).toThrow(/sample/i);
  });
});

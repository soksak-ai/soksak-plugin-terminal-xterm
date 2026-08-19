export type RendererBenchmarkMode = "printable" | "adversarial";

export interface RendererSampleSummary {
  samplesMs: number[];
  elapsedMs: number;
  totalBytes: number;
  p50Ms: number;
  p95Ms: number;
  maxMs: number;
  throughputMiBps: number;
}

const PRINTABLE_LINE_BYTES = 80;

export function createRendererPayload(
  mode: RendererBenchmarkMode,
  bytes: number,
): Uint8Array {
  if (!Number.isInteger(bytes) || bytes < 1) {
    throw new Error("bytes must be a positive integer");
  }
  const payload = new Uint8Array(bytes);
  if (mode === "printable") {
    for (let index = 0; index < bytes; index += 1) {
      const column = index % PRINTABLE_LINE_BYTES;
      payload[index] = column === PRINTABLE_LINE_BYTES - 2
        ? 13
        : column === PRINTABLE_LINE_BYTES - 1
          ? 10
          : 32 + ((index * 17 + 11) % 95);
    }
    return payload;
  }
  if (mode !== "adversarial") {
    throw new Error(`unknown renderer benchmark mode: ${String(mode)}`);
  }
  let state = 0x9e3779b9;
  for (let index = 0; index < bytes; index += 1) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    payload[index] = state & 0xff;
  }
  return payload;
}

export function summarizeRendererSamples(
  samplesMs: number[],
  bytesPerSample: number,
): RendererSampleSummary {
  if (samplesMs.length === 0) throw new Error("at least one sample is required");
  if (!Number.isInteger(bytesPerSample) || bytesPerSample < 1) {
    throw new Error("bytesPerSample must be a positive integer");
  }
  if (samplesMs.some((sample) => !Number.isFinite(sample) || sample < 0)) {
    throw new Error("samples must be finite non-negative milliseconds");
  }
  const sorted = [...samplesMs].sort((left, right) => left - right);
  const elapsedMs = samplesMs.reduce((total, sample) => total + sample, 0);
  const totalBytes = bytesPerSample * samplesMs.length;
  return {
    samplesMs: [...samplesMs],
    elapsedMs,
    totalBytes,
    p50Ms: nearestRank(sorted, 0.5),
    p95Ms: nearestRank(sorted, 0.95),
    maxMs: sorted[sorted.length - 1],
    throughputMiBps: elapsedMs === 0
      ? Number.POSITIVE_INFINITY
      : totalBytes / (1024 * 1024) / (elapsedMs / 1000),
  };
}

function nearestRank(sorted: number[], quantile: number): number {
  const rank = Math.max(1, Math.ceil(quantile * sorted.length));
  return sorted[rank - 1];
}

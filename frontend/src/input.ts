export type WebkitImeInput = {
  shouldSkip(data: string): boolean;
  shouldFlushPending(data: string): boolean;
  flushPending(): void;
};

export function createSerialTerminalWriter(write: (data: string) => Promise<void>): (data: string) => Promise<void> {
  let tail = Promise.resolve();
  return (data) => {
    const result = tail.then(() => write(data));
    tail = result.catch(() => undefined);
    return result;
  };
}

export function routeXtermData(
  ime: WebkitImeInput,
  write: (data: string) => Promise<void>,
  data: string,
): void {
  if (ime.shouldSkip(data)) return;
  if (ime.shouldFlushPending(data)) ime.flushPending();
  void write(data);
}

import { describe, expect, it } from "vitest";

import { createSerialTerminalWriter, routeXtermData } from "./input";

describe("terminal input ownership", () => {
  it("serializes finalized IME text and following plain input", async () => {
    const calls: string[] = [];
    let releaseFirst!: () => void;
    const firstBlocked = new Promise<void>((resolve) => { releaseFirst = resolve; });
    const write = createSerialTerminalWriter(async (data) => {
      calls.push(data);
      if (data === "한") await firstBlocked;
    });

    const first = write("한");
    const second = write("글 ");
    await Promise.resolve();
    expect(calls).toEqual(["한"]);

    releaseFirst();
    await Promise.all([first, second]);
    expect(calls).toEqual(["한", "글 "]);
  });

  it("drops leaked composition jamo and flushes a pending syllable before external input", async () => {
    const calls: string[] = [];
    const write = createSerialTerminalWriter(async (data) => { calls.push(data); });
    const ime = {
      shouldSkip: (data: string) => data === "ㅎ",
      flushPending: () => { void write("한"); },
    };

    routeXtermData(ime, write, "ㅎ");
    routeXtermData(ime, write, " ");
    await write("끝");

    expect(calls).toEqual(["한", " ", "끝"]);
  });
});

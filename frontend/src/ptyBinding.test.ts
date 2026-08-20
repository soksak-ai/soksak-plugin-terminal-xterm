// @vitest-environment jsdom
/** What the concrete binding says to the unit, and what it does with what comes back.
 *
 *  terminal.test.ts drives a hand-written binding, so it proves how a screen uses one and nothing
 *  about the one the product ships. The three faults below all lived under that gap: a shell was
 *  running, the unit was healthy, and the pane was blank or frozen with nothing anywhere saying why.
 *
 *  A fake unit stands in for the socket. It is not a mock of the binding — the binding under test is
 *  the shipped one, and only what it talks to is replaced.
 */
import { describe, expect, it } from "vitest";

import { ptyBinding, type SidecarChannel, type TerminalHost } from "./activate";

type Sent = { command: string; request: Record<string, unknown> };

/** A unit that records what it was asked and hands back a stream nobody has read yet. */
function unit() {
  const sent: Sent[] = [];
  let deliver: ((bytes: Uint8Array) => void) | null = null;
  const answer = (data: Record<string, unknown> = {}) => ({
    id: "t", ok: true, result: { code: "OK", data },
  });

  const record = (request: Record<string, unknown>) => {
    const args = request.args as { request: Record<string, unknown> };
    sent.push({ command: request.command as string, request: args.request });
  };

  const channel: SidecarChannel = {
    async send(request) {
      record(request);
      return answer(request.command === "pty.open" ? { session: 7, created: true } : {});
    },
    async stream(request, handlers) {
      record(request);
      deliver = handlers.onBytes;
      return { answer: answer(), close: { dispose() {} } };
    },
    async close() {},
  };

  const host: TerminalHost = {
    ui: { registerView: () => ({ dispose() {} }) },
    commands: { register: () => ({ dispose() {} }), execute: async () => ({ ok: true }) },
    locale: () => "en",
    windowLabel: () => "window-2",
    sidecar: { open: async () => channel },
  } as unknown as TerminalHost;

  return {
    binding: ptyBinding(host),
    sent,
    /** The unit produces output. Nothing about the caller is assumed. */
    produce(text: string) {
      if (!deliver) throw new Error("nothing attached to the session");
      deliver(new TextEncoder().encode(text));
    },
    of(command: string) {
      return sent.filter((one) => one.command === command);
    },
  };
}

describe("what the binding sends to the unit", () => {
  it("names the window the session was opened under", async () => {
    // It sent an empty label until 2026-08-20. Every window's sessions then belonged to the same
    // nameless window, so closing one window asked the unit to let go of sessions it did not own —
    // and a restored screen could not be told from another window's.
    const it_ = unit();
    await it_.binding.open("pane-1", 80, 24, "none");

    expect(it_.of("pty.open")[0].request.windowLabel).toBe("window-2");
  });

  it("acks what it took, so the reader is never paused", async () => {
    // The unit pauses its reader above a high watermark of unacked bytes and resumes at half of it.
    // A client that never acks therefore receives about a megabyte and then stops: the shell is
    // alive and still writing, the pane is frozen, and no error is produced anywhere.
    const it_ = unit();
    await it_.binding.open("pane-1", 80, 24, "none");

    it_.produce("aaaa");
    it_.produce("bb");
    await Promise.resolve();
    await Promise.resolve();

    // A running total, not a delta: one ack that never arrived would otherwise hold the reader back
    // by its own size forever.
    expect(it_.of("pty.ack").map((one) => one.request)).toEqual([
      { session: 7, bytes: 4 },
      { session: 7, bytes: 6 },
    ]);
  });
});

describe("what the binding does with what arrives", () => {
  it("keeps what came before a reader did", async () => {
    // The stream is attached inside open(), and a reader can only be registered once open() has
    // returned a handle. The shell's first prompt and a replayed tail land in that gap.
    const it_ = unit();
    const session = await it_.binding.open("pane-1", 80, 24, { fromSeq: 0 });

    it_.produce("$ ");
    it_.produce("echo");

    const seen: string[] = [];
    it_.binding.onData(session, (bytes) => seen.push(new TextDecoder().decode(bytes)));

    expect(seen).toEqual(["$ ", "echo"]);
  });

  it("hands a later reader what comes next, not the screen it missed", async () => {
    // A second reader is a second view of a stream already in progress. Replaying the buffer into it
    // would draw the prompt twice on a screen that already has it.
    const it_ = unit();
    const session = await it_.binding.open("pane-1", 80, 24, "none");
    it_.produce("$ ");

    const first: string[] = [];
    it_.binding.onData(session, (bytes) => first.push(new TextDecoder().decode(bytes)));
    const second: string[] = [];
    it_.binding.onData(session, (bytes) => second.push(new TextDecoder().decode(bytes)));

    it_.produce("ls");

    expect(first).toEqual(["$ ", "ls"]);
    expect(second).toEqual(["ls"]);
  });
});

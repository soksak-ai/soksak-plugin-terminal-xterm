import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const activate = readFileSync(new URL("../frontend/src/activate.ts", import.meta.url), "utf8");
const renderer = readFileSync(new URL("../frontend/src/xterm-renderer.ts", import.meta.url), "utf8");

test("the common kit exclusively owns terminal lifecycle and standard commands", () => {
  assert.equal((activate.match(/activateProviderTerminalPlugin\s*\(/g) ?? []).length, 1);
  for (const forbidden of [
    "createTerminalSessionBinding", "createTerminalStatusController",
    "createTerminalResizeWorker", "observeTerminalLayout", "waitForTerminalConditions",
  ]) {
    assert.equal(activate.includes(forbidden), false, `activate.ts owns ${forbidden}`);
    assert.equal(renderer.includes(forbidden), false, `xterm-renderer.ts owns ${forbidden}`);
  }
  assert.equal((renderer.match(/terminal[.]onRender[(]/g) ?? []).length, 1, "one real render observer owns presentation timing");
  const waitStart = renderer.indexOf("const waitForText = createTerminalTextWait(");
  const waitEnd = renderer.indexOf("\n  const fit =", waitStart);
  assert.notEqual(waitStart, -1, "renderer must declare its parser-completion text wait");
  assert.notEqual(waitEnd, -1, "renderer text wait boundary must be inspectable");
  const waitBoundary = renderer.slice(waitStart, waitEnd);
  assert.equal(waitBoundary.includes("parsed.add(callback)"), true, "text waits must observe parser completion");
  assert.equal(waitBoundary.includes("renderedListeners"), false, "text waits must not observe render events");
  assert.equal(renderer.includes("terminal.onWriteParsed"), false, "text waits must observe exact write completion");
});

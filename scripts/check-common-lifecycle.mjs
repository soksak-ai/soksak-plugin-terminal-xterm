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
  assert.equal(renderer.includes("terminal.onRender"), false, "text waits must observe parser completion");
  assert.equal(renderer.includes("terminal.onWriteParsed"), false, "text waits must observe exact write completion");
});

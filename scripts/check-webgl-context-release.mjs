import assert from "node:assert/strict";
import test from "node:test";

import { patchXtermWebglContextRelease } from "../frontend/xterm-webgl-context-release.mjs";

test("the WebGL addon context release patch is exact and idempotent", () => {
  const source = "before,this._canvas.parentElement?.removeChild(this._canvas),Ai(this._terminal),after";
  const patched = patchXtermWebglContextRelease(source);
  assert.equal((patched.match(/WEBGL_lose_context/g) ?? []).length, 1);
  assert.equal(patchXtermWebglContextRelease(patched), patched);
  assert.throws(
    () => patchXtermWebglContextRelease("no matching teardown"),
    /match count is 0, expected 1/,
  );
});

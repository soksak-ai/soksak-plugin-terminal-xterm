// vitest 는 build.mjs 의 esbuild alias 를 모른다 — 테스트가 kit 을 런타임 import 할 수 있으므로
// 같은 발견(SOKSAK_HOME/kits/<이름>/src)으로 resolve.alias 를 공급한다(build.mjs 와 동형).
import { defineConfig } from "vitest/config";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";

const SOKSAK_HOME = process.env.SOKSAK_HOME ?? path.join(os.homedir(), ".soksak-dev");
const pkg = JSON.parse(fs.readFileSync(new URL("package.json", import.meta.url), "utf8"));
const kits = Object.fromEntries(
  Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
    .map((n) => [n, path.join(SOKSAK_HOME, "kits", n, "src", "index.ts")])
    .filter(([, p]) => fs.existsSync(p)),
);

export default defineConfig({ resolve: { alias: kits } });

// This plugin's strings come from its own table, not from literals in the code.
//
// The host translates the host's surfaces. A plugin that hardcodes a sentence
// ships one language, and a plugin that reads the host's table breaks the first
// time the host renames a key it never promised.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { t } from "./i18n";

const SOURCE = join(__dirname);

describe("plugin i18n", () => {
  it("answers in the host's language and falls back to English", () => {
    expect(t("terminal.cleared", "ko")).toBe("터미널 화면을 지웠습니다");
    expect(t("terminal.cleared", "en")).toBe("Cleared the terminal screen");
    expect(t("terminal.cleared", "fr")).toBe("Cleared the terminal screen");
  });

  it("no source file outside the table carries a display string", () => {
    const offenders: string[] = [];
    let scanned = 0;
    for (const name of readdirSync(SOURCE)) {
      if (!name.endsWith(".ts") || name.includes(".test.")) continue;
      // i18n.ts is the table. manifest.ts declares LocalizedText pairs — both
      // languages side by side, which is the declaration form rather than a
      // hardcoded sentence.
      if (name === "i18n.ts" || name === "manifest.ts") continue;
      scanned++;
      const body = readFileSync(join(SOURCE, name), "utf8");
      for (const [index, line] of body.split("\n").entries()) {
        // A comment may describe behaviour in any language. A string literal
        // shown to a person may not.
        const code = line.replace(/^\s*(\/\/|\*|\/\*).*$/, "");
        if (/[가-힣]/.test(code)) offenders.push(`${name}:${index + 1} ${line.trim()}`);
      }
    }
    expect(scanned).toBeGreaterThan(3);
    expect(offenders).toEqual([]);
  });
});

import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@soksak/soksak-kit-plugin-terminal": fileURLToPath(
        new URL("../../../soksak-kits/soksak-kit-plugin-terminal/src/index.ts", import.meta.url),
      ),
      "@soksak/soksak-contract-plugin-terminal": fileURLToPath(
        new URL("../../../soksak-contracts/soksak-contract-plugin-terminal/src/index.ts", import.meta.url),
      ),
    },
  },
});

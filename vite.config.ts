import { defineConfig } from "vitest/config";

// Builds the app (`npm run build`) and serves it while developing (`npm run dev`).
// Vitest (`npm test`) runs the logic tests: every *.test.ts in src/.
export default defineConfig({
  // Relative paths, so the built app works from any folder or link.
  base: "./",
  test: {
    include: ["src/**/*.test.ts"],
  },
});

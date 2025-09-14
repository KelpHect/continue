import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    testTransformMode: {
      web: ["/.[jt]s?$/"],
      ssr: ["/.[jt]s?$/"],
    },
    globalSetup: "./test/vitest.global-setup.ts",
    setupFiles: "./test/vitest.setup.ts",
    fileParallelism: false,
    include: ["**/*.vitest.ts", "**/*.test.ts"],
    testTimeout: 10000,
    environment: "node",
    coverage: {
      reporter: ["text", "html", "lcov"],
      exclude: [
        "**/node_modules/**",
        "**/vendor/**",
        "**/test/**",
        "**/*.test.ts",
        "**/*.spec.ts",
      ],
    },
    maxWorkers: 1,
  },
});

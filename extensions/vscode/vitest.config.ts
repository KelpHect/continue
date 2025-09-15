// MIGRATION NOTE: This configuration supports the legacy vitest tests during migration to Mocha.
// New tests should be written using Mocha in src/test/ directory.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.vitest.ts"], // Only include .vitest.ts files
    environment: "node",
  },
});
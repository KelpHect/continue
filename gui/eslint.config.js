// @ts-check
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.jsx", "**/*.js"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        // Disable project-specific TS checking to avoid tsconfig issues
        // project: ["./tsconfig.json", "./tsconfig.node.json"],
      },
      globals: {
        // Node.js globals
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        URL: "readonly",
        Headers: "readonly",
        Response: "readonly",
        Request: "readonly",
        TextDecoder: "readonly",
        TextEncoder: "readonly",
        // Browser environment globals
        window: "readonly",
        document: "readonly",
        HTMLElement: "readonly",
        Element: "readonly",
        Event: "readonly",
        MouseEvent: "readonly",
        KeyboardEvent: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        location: "readonly",
        history: "readonly",
        navigator: "readonly",
        WebSocket: "readonly",
        Worker: "readonly",
        Blob: "readonly",
        File: "readonly",
        FileReader: "readonly",
        FormData: "readonly",
        Image: "readonly",
        XMLHttpRequest: "readonly",
        MutationObserver: "readonly",
        ResizeObserver: "readonly",
        IntersectionObserver: "readonly",
        alert: "readonly",
        confirm: "readonly",
        prompt: "readonly",
        getComputedStyle: "readonly",
        // React globals (common in React projects)
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      "@typescript-eslint/naming-convention": "off",
      // "@typescript-eslint/no-floating-promises": "warn", // Requires type information
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-empty": "warn",
    },
  },
  {
    ignores: [
      "out",
      "dist",
      "**/*.d.ts",
      "**/node_modules/**",
      "**/vendor/**",
      "**/__mocks__/**",
      "**/test/**",
      "**/*.test.*",
      "**/*.spec.*",
      "**/*.vitest.*",
      "**/coverage/**",
      "**/build/**",
      "**/e2e/**",
    ],
  },
];
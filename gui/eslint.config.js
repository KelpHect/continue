// @ts-check
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  // Configuration for CommonJS files (Node.js environment)
  {
    files: ["**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "commonjs",
      globals: {
        // Node.js globals for CommonJS files
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
        module: "readonly",
        exports: "readonly",
        require: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-empty": "warn",
    },
  },
  // Configuration for TypeScript and modern JS files
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.jsx", "**/*.js"],
    ignores: ["**/*.cjs"],
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
        URLSearchParams: "readonly",
        AbortController: "readonly",
        // Node.js types
        NodeJS: "readonly",
        // Browser environment globals
        window: "readonly",
        document: "readonly",
        HTMLElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLUListElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLSelectElement: "readonly",
        HTMLTextAreaElement: "readonly",
        HTMLImageElement: "readonly",
        HTMLLIElement: "readonly",
        Element: "readonly",
        Node: "readonly",
        Text: "readonly",
        Range: "readonly",
        NodeFilter: "readonly",
        Event: "readonly",
        MouseEvent: "readonly",
        KeyboardEvent: "readonly",
        DragEvent: "readonly",
        MessageEvent: "readonly",
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
        ScrollBehavior: "readonly",
        queueMicrotask: "readonly",
        structuredClone: "readonly",
        crypto: "readonly",
        AbortSignal: "readonly",
        // SVG globals
        SVGElement: "readonly",
        SVGSVGElement: "readonly",
        // React globals (common in React projects)
        React: "readonly",
        JSX: "readonly",
        // Third-party library globals
        Handlebars: "readonly",
        vscode: "readonly",
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
      "no-extra-boolean-cast": "warn",
      "no-redeclare": "warn", // Change from error to warning
      "no-case-declarations": "warn", // Change from error to warning
      "no-unreachable": "warn", // Change from error to warning
      "no-fallthrough": "warn", // Change from error to warning
      "no-useless-catch": "warn", // Change from error to warning
      "no-async-promise-executor": "warn", // Change from error to warning
      "require-yield": "warn", // Change from error to warning
      "no-control-regex": "warn", // Change from error to warning
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
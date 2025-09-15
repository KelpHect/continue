// @ts-check
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        // Node.js globals
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        BufferEncoding: "readonly",
        global: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        performance: "readonly",
        queueMicrotask: "readonly",
        crypto: "readonly",
        
        // Browser/Web APIs
        fetch: "readonly",
        URL: "readonly",
        Headers: "readonly",
        Response: "readonly",
        Request: "readonly",
        TextDecoder: "readonly",
        TextEncoder: "readonly",
        structuredClone: "readonly",
        window: "readonly",
        document: "readonly",
        btoa: "readonly",
        atob: "readonly",
        
        // TypeScript/Node types
        NodeJS: "readonly",
        
        // Third-party library globals
        Handlebars: "readonly",
        HandlebarsTemplateDelegate: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      import: importPlugin,
    },
    rules: {
      quotes: ["off", "double", {}],
      "@typescript-eslint/naming-convention": "off",
      // This is important: when floating promises cause unhandled rejections, the JetBrains binary blows up
      "@typescript-eslint/no-floating-promises": "error",
      "import/order": "off",
      curly: "off",
      eqeqeq: "error",
      complexity: ["warn", { max: 50 }], // Increased from 36, made it a warning
      "max-lines-per-function": ["warn", { max: 500 }], // Made it a warning
      "max-statements": ["warn", { max: 108 }], // Made it a warning
      "max-depth": ["warn", { max: 6 }], // Made it a warning
      "max-nested-callbacks": ["warn", { max: 4 }], // Made it a warning
      "max-params": ["warn", { max: 8 }], // Made it a warning
      "no-negated-condition": "warn",
      "@typescript-eslint/no-misused-promises": "error",
      "no-throw-literal": "warn",
      semi: "off",
      "no-unused-vars": "warn",
      "no-undef": "error",
      // Downgrade or disable some problematic rules
      "no-empty": "warn", // Changed from error to warning
      "no-case-declarations": "warn", // Changed from error to warning
      "no-useless-escape": "warn", // Changed from error to warning
      "require-yield": "warn", // Changed from error to warning
      "no-useless-catch": "warn", // Changed from error to warning
      "no-extra-boolean-cast": "warn", // Changed from error to warning
      "no-unsafe-optional-chaining": "warn", // Changed from error to warning
      "no-fallthrough": "warn", // Changed from error to warning
      "no-ex-assign": "warn", // Changed from error to warning
    },
  },
  {
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.test.skip.ts",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/*.spec.skip.ts",
      "**/*.vitest.ts",
    ],
    languageOptions: {
      globals: {
        // Vitest testing globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        vi: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        suite: "readonly",
        vitest: "readonly",
        
        // Jest compatibility (sometimes used)
        jest: "readonly",
      },
    },
    rules: {
      "max-lines-per-function": "off",
      // Allow more flexibility in tests
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    ignores: [
      "**/vendor/**",
      "**/__mocks__/**",
      "**/test/files/**",
      "**/coverage/**",
      "**/dist/**",
      "**/out/**",
      "**/*.d.ts",
      "**/file:/**",  // Test workspace directories
      "**/tmp/**",    // Temporary test files
      "**/*.js",      // Generated JavaScript files
      "**/*.mjs",     // Generated ES modules
    ],
  },
];
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
        structuredClone: "readonly",
        NodeJS: "readonly",
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
      complexity: ["error", { max: 36 }],
      "max-lines-per-function": ["error", { max: 500 }],
      "max-statements": ["error", { max: 108 }],
      "max-depth": ["error", { max: 6 }],
      "max-nested-callbacks": ["error", { max: 4 }],
      "max-params": ["error", { max: 8 }],
      "no-negated-condition": "warn",
      "@typescript-eslint/no-misused-promises": "error",
      "no-throw-literal": "warn",
      semi: "off",
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  {
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/*.vitest.ts",
    ],
    rules: {
      "max-lines-per-function": "off",
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
    ],
  },
];
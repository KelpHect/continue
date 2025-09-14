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
      "no-negated-condition": "warn",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/semi": "warn",
      "@typescript-eslint/no-misused-promises": "error",
      curly: "warn",
      eqeqeq: "warn",
      "no-throw-literal": "warn",
      semi: "off",
      "no-unused-vars": "warn", // Allow unused vars for now
      "no-undef": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
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
// @ts-check
import baseConfig from "../eslint.config.js";

export default [
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [
      "**/vendor/**",
      "**/__mocks__/**",
      "**/test/files/**",
      "**/coverage/**",
      "**/dist/**",
      "**/out/**",
      "**/*.d.ts",
    ],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      quotes: ["off", "double", {}],
      "@typescript-eslint/naming-convention": "off",
      // This is important: when floating promises cause unhandled rejections, the JetBrains binary blows up
      "@typescript-eslint/no-floating-promises": "error",
      "import/order": "off",
      curly: "off",
      "@typescript-eslint/semi": "off",
      eqeqeq: "error",
      complexity: ["error", { max: 36 }],
      "max-lines-per-function": ["error", { max: 500 }],
      "max-statements": ["error", { max: 108 }],
      "max-depth": ["error", { max: 6 }],
      "max-nested-callbacks": ["error", { max: 4 }],
      "max-params": ["error", { max: 8 }],
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
];
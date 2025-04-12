import eslint from "@eslint/js";
import globals from "globals";
export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**", "**/build/**", "**/__tests__/**", "**/jest.config.js**/"]
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...eslint.configs.recommended,
    languageOptions: { globals: globals.browser }
  }
];
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
export default defineConfig([
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**", "**/build/**", "**/__tests__/**", "**/jest.config.js**/"]
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  }
]);
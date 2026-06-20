import playwright from 'eslint-plugin-playwright';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    // TypeScript recommended rules across all source files.
    files: ['**/*.ts'],
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: { parser: tsParser },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    // Playwright-specific rules scoped to test files only.
    files: ['tests/**/*.ts'],
    plugins: { playwright },
    rules: {
      'playwright/no-raw-locators': 'error',
      'playwright/no-wait-for-timeout': 'error',
    },
  },
];

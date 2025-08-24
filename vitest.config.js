// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    roots: ['boilerplate/contract/src/test'], // Adjust path to your test folder
    exclude: [
      '**/__mocks__/**',
      '**/*.spec.ts', // Optional: Exclude specific file types if needed
    ],
  },
});
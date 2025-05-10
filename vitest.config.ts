import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['src/us-data.json'],
    },
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

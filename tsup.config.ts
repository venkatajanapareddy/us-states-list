import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: true,
  onSuccess: 'cp src/us-data.json dist/us-data.json || true',
});

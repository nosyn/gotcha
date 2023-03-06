import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ['./index.ts', './prisma/seed.ts'],
  format: ['esm'],
  dts: true,
  minify: true,
  clean: false,
  external: [],
  ...options,
  onSuccess: 'node dist/index.js',
  ignoreWatch: ['*.test.ts'],
}));

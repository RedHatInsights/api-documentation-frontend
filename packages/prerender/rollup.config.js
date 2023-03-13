// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    json(),
    resolve({
      preferBuiltins: true
    }),
    typescript()
  ],
  external: ['react', 'site-prerender', 'site-prerender/lib/crawler', 'site-prerender/lib/serve', 'site-prerender/lib/log'],
};

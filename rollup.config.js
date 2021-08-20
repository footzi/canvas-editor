import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import postcss from 'rollup-plugin-postcss';
import eslint from '@rollup/plugin-eslint';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/bundle.js',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    postcss({
      plugins: [],
    }),
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    globals(),
    eslint(),
  ],
};

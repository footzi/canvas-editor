import typescript from '@rollup/plugin-typescript';

// const {typescript } = require('@rollup/plugin-typescript');

export default {
    input: './src/index.ts',
    output: {
        file: './dist/bundle.js',
        format: 'cjs'
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' })]
};
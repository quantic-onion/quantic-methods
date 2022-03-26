
const path = require('path');
const { defineConfig } = require('vite');
import typescript from 'rollup-plugin-typescript2';

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'quantic-methods',
      fileName: (format) => `quantic-methods.${format}.ts`
    },
    rollupOptions: {},
    plugins: [
      typescript(/*{ plugin options }*/)
    ],
  }
})
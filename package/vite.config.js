
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'quantic-methods',
      fileName: (format) => `quantic-methods.${format}.ts`
    },
    rollupOptions: {

    }
  }
})
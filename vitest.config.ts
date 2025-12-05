// vitest.config.ts  (root mein)
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],

    // YEH LINE ADD KAR DI → esbuild ka bug fix
    deps: {
      optimizer: {
        web: {
          exclude: ['esbuild']
        }
      }
    },

    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
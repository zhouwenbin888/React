import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    cors: true,
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        ws:true,
        changeOrigin: true,
        rewrite: (path) => path.replace('/^\/api/', ' ')
      }
    }
  }
})

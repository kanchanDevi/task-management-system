/*disable eslint */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8080'

      }
    }
  }
})

/*disable eslint */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
        target: 'https://crud-jgvc.onrender.com', // Replace with your remote backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})

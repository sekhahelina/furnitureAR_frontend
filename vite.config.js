import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {

    port: 5173,
    host: true,       // доступний по мережі
    https: false,     // залиш false — Quick Look працює якщо USDZ з Cloudinary (HTTPS)
    proxy: {
      '/api': {
        target: 'http://192.168.0.101:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),   tailwindcss(),],
  server: {
    allowedHosts: ["b9a2-102-89-76-60.ngrok-free.app"]
  }
})

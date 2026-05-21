import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages: /sanskrit-sound/ · Vercel/本地: /
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})

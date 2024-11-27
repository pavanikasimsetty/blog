import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { rmSync } from 'fs'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Ensures the output directory is cleared before build
    base: '/',
  },
})

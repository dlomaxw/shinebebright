import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'client'),
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './shared'),
      '@client': path.resolve(__dirname, './client'),
      '@server': path.resolve(__dirname, './server'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'public'),
    emptyOutDir: true,
  },
})

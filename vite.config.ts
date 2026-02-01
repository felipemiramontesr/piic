import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'oil-skimmers': ['./src/pages/OilSkimmersForm.tsx'],
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})

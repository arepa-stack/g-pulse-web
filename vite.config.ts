import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GLB models are large; keep them out of the JS bundle (served from /public).
  assetsInclude: ['**/*.glb'],
  build: {
    chunkSizeWarningLimit: 1500,
  },
})

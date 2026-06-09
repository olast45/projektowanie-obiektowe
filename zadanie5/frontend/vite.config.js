import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["ex5-frontend.onrender.com"]
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})

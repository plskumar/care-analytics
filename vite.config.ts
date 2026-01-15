import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // This 'base' is critical for your GitHub deployment later!
  base: '/care-analytics/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})
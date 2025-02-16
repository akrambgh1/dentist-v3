/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      components: path.resolve(__dirname, "src/components"), // Add this alias
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})

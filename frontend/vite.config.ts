import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@toolkit": path.resolve(__dirname, "./src/toolkit"),
      "@images": path.resolve(__dirname, "./src/images"),
      "@icons": path.resolve(__dirname, "./src/icons"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname,"./src/types")
    },
  },
  plugins: [react()],
  define: {
    'BACKEND_API_BASE_URL' : JSON.stringify(process.env.BACKEND_API_BASE_URL)
  }
});
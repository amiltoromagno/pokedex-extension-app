import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        content: 'src/main.tsx'
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    outDir: 'dist',
    manifest: false
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
})

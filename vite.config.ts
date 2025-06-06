import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  publicDir: 'public',
  build: {
    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // CSS handling optimizations
    cssCodeSplit: true, // Split CSS into separate files for better caching
    cssMinify: true,
    // Code splitting and chunk optimization
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-label', '@radix-ui/react-slot'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
      },
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging but smaller inline maps
    sourcemap: false,
  },
}) 
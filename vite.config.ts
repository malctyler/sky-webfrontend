/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    react({
      // Include JSX and TSX files
      include: /\.(js|jsx|ts|tsx)$/,
      babel: {
        plugins: [
          // Add any babel plugins here
        ],
      }
    }),
    tsconfigPaths()
  ],  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@contexts': resolve(__dirname, 'src/contexts'),
      '@services': resolve(__dirname, 'src/services'),
      '@types': resolve(__dirname, 'src/types')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: { 
        'top-level-await': true 
      },
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://sky-webapi-hna3fdbegqcqhuf9.uksouth-01.azurewebsites.net',
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    minify: 'esbuild',
    target: 'es2020',
    outDir: 'build',
    chunkSizeWarningLimit: 2200,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

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
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve(__dirname, './src')
    }
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
          vendor: ['react', 'react-dom', 'react-router-dom'],
          material: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  }
})

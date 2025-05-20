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
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'build', // Match Azure Static Web Apps expected directory
    chunkSizeWarningLimit: 2200, // Increase chunk size warning limit
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
      }
    }
  }
})
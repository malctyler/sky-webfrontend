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
      '@types': resolve(__dirname, 'src/types'),
      // Add Buffer polyfill for @react-pdf/renderer
      buffer: 'buffer',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },  css: {
    preprocessorOptions: {
      scss: {
        // Make sure Leaflet CSS works properly
      }
    }
  },test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    deps: {
      inline: ['@mui/material', '@mui/x-date-pickers', '@mui/icons-material']
    }
  },
  optimizeDeps: {
    include: [
      'react/jsx-runtime',
      'react', 
      'react-dom',
      'react-dom/client',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/system',
      'leaflet', 
      'react-leaflet',
      'buffer'
    ],
    exclude: ['react/jsx-dev-runtime'],
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
  define: {
    global: 'globalThis',
    // Add Buffer polyfill for @react-pdf/renderer
    'global.Buffer': 'Buffer',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5207',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    minify: 'esbuild',
    target: 'es2020',
    outDir: 'build',
    chunkSizeWarningLimit: 1500, // Reduce to encourage smaller chunks
    rollupOptions: {
      external: (id) => {
        // Don't externalize anything - bundle everything
        return false;
      },
      output: {
        manualChunks: (id) => {
          // React core libraries - keep together and prioritize
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          
          // React-related libraries that depend on React
          if (id.includes('react-router') || id.includes('@emotion') || id.includes('react-leaflet')) {
            return 'react-deps';
          }
          
          // MUI components - separate from React core
          if (id.includes('@mui/material') || id.includes('@mui/system') || id.includes('@mui/base')) {
            return 'mui-core';
          }
          
          // MUI icons (separate chunk as it's large)
          if (id.includes('@mui/icons-material')) {
            return 'mui-icons';
          }
          
          // MUI date pickers
          if (id.includes('@mui/x-date-pickers')) {
            return 'mui-date-pickers';
          }
          
          // Date utilities
          if (id.includes('date-fns') || id.includes('dayjs')) {
            return 'date-utils';
          }
          
          // Leaflet mapping libraries
          if (id.includes('leaflet') && !id.includes('react-leaflet')) {
            return 'leaflet';
          }
          
          // PDF and chart libraries
          if (id.includes('@react-pdf') || id.includes('recharts') || id.includes('chart')) {
            return 'charts-pdf';
          }
          
          // HTTP and API libraries
          if (id.includes('axios') || id.includes('fetch')) {
            return 'http-utils';
          }
          
          // Other large vendors
          if (id.includes('node_modules/')) {
            // Group smaller libraries together
            if (id.includes('lodash') || id.includes('ramda') || id.includes('uuid')) {
              return 'utils';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})

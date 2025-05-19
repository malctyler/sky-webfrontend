import { defineConfig } from 'vite'
import reactSwc from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [reactSwc({
    tsDecorators: true,
    tsConfigPath: './tsconfig.build.json'
  })],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: { 
        'top-level-await': true 
      },
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

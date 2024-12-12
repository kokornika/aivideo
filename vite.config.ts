import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/replicate': {
        target: 'https://api.replicate.com/v1',
        changeOrigin: true,
        secure: false,
        headers: {
          'Authorization': `Bearer ${process.env.VITE_REPLICATE_API_TOKEN}`
        }
      }
    }
  }
});

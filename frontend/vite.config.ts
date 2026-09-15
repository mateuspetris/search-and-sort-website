import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:8080';

// Em desenvolvimento o Vite repassa /api para o backend, então o navegador
// fala com uma única origem e o CORS não entra em jogo.
const apiProxy = {
  '/api': { target: backendUrl, changeOrigin: true },
};

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: apiProxy },
  preview: { port: 5173, proxy: apiProxy },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});

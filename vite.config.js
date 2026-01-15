import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Подключаем официальный плагин React
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'build',
  },
  // Настройка esbuild для обработки JSX в .js файлах
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/, 
    exclude: [],
  },
  // Заглушка для старого кода, который ищет process.env
  define: {
    'process.env': {}
  }
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Изменили React на react

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    // Папка сборки по умолчанию — dist
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/, 
    exclude: [],
  },
  define: {
    'process.env': {}
  }
});
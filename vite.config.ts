import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true, // optional if you want global expect/describe without imports
    css: true, // optional to allow importing css in components during tests
  },
});

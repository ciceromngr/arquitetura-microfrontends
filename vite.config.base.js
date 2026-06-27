import { defineConfig } from 'vite';

/**
 * Configuração base Vite compartilhada entre todos os microfrontends.
 * Cada app estende essa config via mergeConfig.
 */
export default defineConfig({
  build: {
    target: 'ES2022',
    outDir: 'dist',
    sourcemap: true,
    lib: {
      formats: ['es'],
    },
  },
  resolve: {
    alias: {
      '@mfe/tokens': '/libs/tokens/src/index.js',
      '@mfe/utils': '/libs/utils/src/index.js',
    },
  },
});

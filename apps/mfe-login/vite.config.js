import { defineConfig, mergeConfig } from 'vite';
import baseConfig from '../../vite.config.base.js';

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      lib: {
        entry: 'src/index.js',
        formats: ['es'],
        fileName: 'mfe-login',
      },
    },
  })
);

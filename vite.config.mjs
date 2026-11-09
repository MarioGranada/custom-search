import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Components carry Flow annotations (`type Props`, `: React.Node`), which CRA's
    // Babel preset stripped implicitly. Oxc cannot parse Flow, so strip it first.
    babel({
      include: /\/src\/.*\.jsx?$/,
      plugins: [['@babel/plugin-transform-flow-strip-types', { all: true }]],
    }),
    react(),
  ],
  base: '/custom-search/',
  server: { port: 3000 },
  preview: { port: 3000 },
  build: { outDir: 'dist' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    css: true,
  },
});

import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import manifest from './src/manifest'
import autoImport from "unplugin-auto-import/vite"

// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    // specifiy server config, because vite^4.3 bug:
    // https://github.com/crxjs/chrome-extension-tools/issues/696
    // https://github.com/crxjs/chrome-extension-tools/issues/693
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
      },
    },
    build: {
      cssCodeSplit: true,
      emptyOutDir: true,
      outDir: 'extension',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
    plugins: [
      crx({ manifest }),
      vue(),
      autoImport({
        imports: [
          {
            'webextension-polyfill': [['*', 'browser']],
          }
        ],
        dts: 'types/browser.d.ts',
      })
    ],
  }
})

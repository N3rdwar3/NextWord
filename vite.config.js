import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// fix as per : https://github.com/vitejs/vite/discussions/13910
export default defineConfig(({ mode }) => ({
  plugins: mode === 'production' ? [vue()] : [vue(),vueDevTools()],
  base: mode === 'production' ? 'https://n3rdwar3.github.io/NextWord/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))

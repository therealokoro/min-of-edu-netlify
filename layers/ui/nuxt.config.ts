import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url))
export default defineNuxtConfig({
  compatibilityDate: 'latest',
  modules: ['@nuxt/ui'],
  css: [join(currentDir, './app/assets/css/main.css')],
  ui: { prefix: 'Ui', colorMode: false }
})
import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    API_KEY: process.env.NUXT_ENV_APP_BUTTER_CMS_API_KEY,
    PREVIEW: process.env.NUXT_ENV_APP_BUTTER_CMS_PREVIEW ?? "true",
  },
  css: [
    '~/assets/css/bootstrap.min.css',
    '~/assets/css/main.css',
    '~/assets/css/lineicons.css',
    '~/assets/css/tiny-slider.css',
  ],
  vite: {
    optimizeDeps: {
      exclude: [
        'plugins/ButterCMS.ts'
      ]
    }
  }
})

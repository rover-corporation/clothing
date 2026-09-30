// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt'
  ],
  css: ['@/assets/styles/default.scss', 
    '@/assets/styles/fonts.scss'],

    runtimeConfig:
    {
      public: 
      {
        strapi: {
          url: process.env.SERVER_URL || 'http://localhost:1337',
        }
      }
    }
  
})

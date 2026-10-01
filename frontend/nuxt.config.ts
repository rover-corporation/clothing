// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  app: {
    head: {
      // Другие глобальные настройки, например title или meta
      title: 'Gurvich Fashion', 
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      
      // Настройка фавиконки
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
        // Если используете PNG:
        // { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        // Если используете SVG:
        // { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
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

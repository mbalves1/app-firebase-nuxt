// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    ['nuxt-vuefire',
    {
      config: {
        apiKey: "AIzaSyBda-DX_RYl0tbRGHWwfBjKqX8sfGAYk4g",
        authDomain: "nuxt-firebase-92975.firebaseapp.com",
        projectId: "nuxt-firebase-92975",
        storageBucket: "nuxt-firebase-92975.appspot.com",
        messagingSenderId: "370728886124",
        appId: "1:370728886124:web:86170b22221965669d5d49",
      },
    }]
  ],
  // vuefire: {
  //   auth: {
  //     enabled: true
  //   }
  // },
  imports: {
    dirs: [
      'store',
      'composables',
      'composables/*/index.{ts,js,mjs,mts}'
    ],
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  build: {
    transpile: ['vuetify', 'chart.js'],
  },
  css: [
    '~/assets/style.scss'
  ],
  router: {
    beforeEach: (to, from, next) => {
      const permissions = localStorage.getItem('token')
      if (!permissions) {
        next({
          path: '/'
        })
      } else {
        next({
          path: '/home'
        })
      }
    }
  }
})

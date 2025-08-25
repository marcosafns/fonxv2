export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      Montserrat: [400, 500, 600, 700]
    },
    display: 'swap'
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  nitro: {
    preset: 'node-server' // garante que ele gere um server Node
  },

devServer: {
  port: Number(process.env.PORT) || 3000
}



})

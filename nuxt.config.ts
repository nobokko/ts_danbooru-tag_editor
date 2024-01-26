// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    baseURL: '/ts_danbooru-tag_editor/',
    buildAssetsDir: 'assets',
  },
  components: {
    dirs: [{ path: './src/components', watch: true, }]
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    baseURL: '/ts_danbooru-tag_editor/',
    cdnURL: '/ts_danbooru-tag_editor/',
    buildAssetsDir: 'assets',
  },
  ssr: false, // サーバーは使用不可
  srcDir: 'src/',
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})

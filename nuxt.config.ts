// https://nuxt.com/docs/api/configuration/nuxt-config
const meta = {
  url: "http://localhost:3000",
  name: "Ministry for Basic and Secondary Education",
  description:
    "The official website of The Kebbi State Ministry for Basic and Secondary Education"
}

export default defineNuxtConfig({
  compatibilityDate: "latest",
  devtools: { enabled: true },

  css: [
    "notivue/animations.css",
    // "@unocss/reset/tailwind-compat.css",
    "~/assets/styles/app.css",
    "~/assets/styles/prose.css"
  ],

  modules: [
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@nuxt/image",
    "@nuxtjs/fontaine",
    "@pinia/nuxt",
    "notivue/nuxt",
    // "@vue-email/nuxt"
    "nuxt-tiptap-editor",
    "@nuxthub/core"
  ],

  app: {
    head: {
      charset: "utf-8",
      htmlAttrs: { lang: "en" },
      templateParams: { separator: "|" },
      titleTemplate: `%s %separator ${meta.name}`,
      meta: [
        {
          name: "description",
          content: meta.description
        }
      ],
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }]
    },
    pageTransition: { name: "page", mode: "out-in" }
  },

  nitro: {
    prerender: {
      routes: ["/", "/login", "/about-us", "/contacts", "/maintenance"]
    }
  },

  extends: ["./layers/ui"],

  // $production: {
  //   image: { provider: 'netlify' },
  //   nitro: { preset: "netlify" }
  // },

  routeRules: {
    "/": { prerender: true },
    "/admin": { ssr: false },
    "/staff": { ssr: false },
    "/news": { swr: true },
    "/announcements": { swr: true }
  },

  runtimeConfig: {
    superAdminEmail: process.env.SUPER_ADMIN_EMAIL,
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,
    emailUser: process.env.EMAIL_USERNAME,
    emailPass: process.env.EMAIL_PASSWORD,
    apiKey: process.env.STORAGE_API_KEY,
    authDomain: process.env.STORAGE_DOMAIN,
    projectId: process.env.STORAGE_PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.STORAGE_MESSAGING_ID,
    appId: process.env.STORAGE_APP_ID,
  },

  experimental: { typedPages: true, asyncContext: true },
  fontMetrics: { fonts: ["Inter"] },
  features: { inlineStyles: false },
  // vueEmail: { autoImport: true }
})
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from "unocss"

export default defineConfig({
  shortcuts: {
    "accent-outline":
      "!outline-0 ring-3 ring-accent/40 ring-offset-1 !dark:outline-0",
    "flex-center": "flex justify-center items-center",
    "flex-horizontal": "flex justify-between items-center",
    "flex-vertical": "flex flex-col justify-between",
    "auto-container": "container mx-auto px-6 lg:px-10",
    "glass-blur":
      "bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60",
    bordered: "border-2.5 !border-base-border",
    "input-field":
      "w-full h-13 px-3 rounded-md text-xs bordered bg-accent/5 focus:accent-outline",
    "accent-button":
      "inline-flex gap-1 items-center justify-center px-4 h-7 text-0.7rem md:(h-10 text-xs font-semibold rounded-md) tracking-wide rounded focus:(outline-none ring-3) bg-accent text-white"
  },
  theme: {
    colors: {
      accent: { DEFAULT: "#139B48", dark: "#0A7233" },
      secondary: {
        100: "#001247",
        200: "#000F20",
        300: "#010F20"
      },
      base: {
        100: "#F4F5F7",
        200: "#FFFFFF",
        300: "#F7FBFF",
        border: "#F4F5FB"
      },
      content: {
        100: "#7F9DBA",
        200: "#435770",
        300: "#869DAF",
        white: "#E6E8EC"
      }
    },
    fontFamily: {
      main: "Inter, sans-serif"
    },
    fontSize: {
      xxs: "0.69rem",
      tiny: "0.58rem"
    },
    breakpoints: {
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1536px"
    }
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography()
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})

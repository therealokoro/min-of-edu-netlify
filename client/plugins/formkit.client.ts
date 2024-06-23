import { plugin, defaultConfig, ssrComplete, createInput } from "@formkit/vue"
import { resetCount } from "@formkit/core"
import {
  FormkitTagInput,
  FormkitSelectMenu,
  FormkitFileUpload,
  FormkitDragDrop
} from "#components"

export default defineNuxtPlugin((nuxtApp) => {
  const config = defaultConfig({
    inputs: {
      tags: createInput(FormkitTagInput, {
        props: ["placeholder"]
      }),
      cselect: createInput(FormkitSelectMenu, {
        props: ["options", "placeholder"]
      }),
      upload: createInput(FormkitFileUpload, {
        props: ["size", "accepts"]
      }),
      dropUpload: createInput(FormkitDragDrop, {
        props: ["size", "accepts"]
      })
    }
  })

  nuxtApp.hook("app:rendered", () => {
    resetCount()
    ssrComplete(nuxtApp.vueApp)
  })

  nuxtApp.vueApp.use(plugin, config)
})

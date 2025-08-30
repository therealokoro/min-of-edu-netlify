export const useContentStore = defineStore("content-store", () => {
  const content = ref<IPageContent | null>(null)
  const loading = ref(false)
  const error = ref<string>("")

  async function fetchContent(force = false) {
    if (content.value && !force) return // prevent unnecessary re-fetch
    loading.value = true

    try {
      const res = await $fetch<IPageContent>("/api/content/get")
      if (res) {
        content.value = { ...res }
      }
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || "Failed to fetch content"
      usePush().error({ message: error.value })
    } finally {
      loading.value = false
    }
  }

  const getSlides = computed(() => content.value?.heroSlider ?? [])
  const getWelcomeAddress = computed(() => content.value?.welcomeAddress ?? "")

  return { 
    content, 
    loading, 
    error, 
    fetchContent, 
    getSlides, 
    getWelcomeAddress 
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContentStore, import.meta.hot))
}

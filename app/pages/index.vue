<script lang="ts" setup>
  import { breakpointsTailwind } from "@vueuse/core"
  const bk = useBreakpoints(breakpointsTailwind)

  const isMobile = computed(() => bk.isSmaller("md"))
  const showFullWelcomeMsg = ref(isMobile.value ? false : true)

  const { data: c } = useFetch("/api/content/get")
  const address = computed(() => c.value?.welcomeAddress as IWelcomeAddress)
  // const stats = computed(() => c.value?.statsCount)
</script>

<template>
  <Page title="Homepage">
    <template #hero>
      <HomePageHero />
    </template>

    <!-- Welcome Message -->
    <PageSection
      heading="Welcome Address"
      description="A Welcome Address From The Comissioner"
      class="welcome-address"
      v-if="address"
    >
      <div w="full" grid="~ cols-1 md:cols-2 gap-10">
        <div col-span="1" flex="center col gap-2">
          <img class="sm:w-300px md:w-400px" :src="address.imgUrl" />

          <div text="center" space="y-1">
            <h3 text="lg md:xl accent" font="bold">
              {{ address.name }}
            </h3>
            <p text="sm" font="bold">{{ address.position }}</p>
          </div>
        </div>

        <ClientOnly>
          <blockquote class="relative">
            <IconsQuote text="accent" />
            <div
              text="sm/9 md:base/10"
              relative
              mt="10"
              space-y="2"
              leading="10"
              italic
            >
              <div v-html="address.body" />
              <div md="hidden" w="full" p="5" flex="center">
                <button
                  bg="transparent"
                  flex="~ gap-2 items-center"
                  text="sm"
                  font="bold"
                  focus-accent-outline
                  @click="showFullWelcomeMsg = !showFullWelcomeMsg"
                >
                  <span>Read {{ showFullWelcomeMsg ? "Less" : "More" }}</span>
                  <i
                    :class="
                      showFullWelcomeMsg
                        ? 'i-mingcute-arrows-up-line'
                        : 'i-mingcute-arrows-down-line'
                    "
                  />
                </button>
              </div>
            </div>
          </blockquote>
        </ClientOnly>
      </div>
    </PageSection>

    <!-- About Us -->
    <LazyHomePageAboutUs />

    <!-- Announcements -->
    <LazyHomePageAnnouncement />

    <!-- News Desk -->
    <!-- <LazyHomePageNews /> -->

    <!-- Statistics -->
    <!-- <LazyHomePageStatistics :stats="stats" /> -->

    <!-- Gallery -->
    <LazyHomePageGallery />
  </Page>
</template>

<style lang="css" scoped>
  .welcome-address img {
    --s: 10px; /* control the size */
    padding: var(--s);
    border: calc(2 * var(--s)) solid #0000;
    outline: 1px solid #000;
    outline-offset: calc(-1 * var(--s));
    background: conic-gradient(from 90deg at 1px 1px, #0000 25%, #000 0);
  }
</style>

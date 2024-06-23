<script lang="ts" setup>
  const isExpanded = useExpandSideNav()
  const nuxt = useNuxtApp()
  nuxt.hook("page:finish", () => {
    isExpanded.value = false
  })
</script>

<template>
  <aside
    lt-md="hidden"
    w="260px"
    p="4"
    h="full"
    flex="~ col gap-10"
    bg="accent"
  >
    <nuxt-link to="/">
      <NuxtImg placeholder src="/logo-alt.svg" w="280px" />
    </nuxt-link>

    <!-- Navigation -->
    <DashboardSidePanelNav />
  </aside>

  <!-- Mobile Menu -->
  <UiSlideover side="left" v-model="isExpanded">
    <div
      relative
      w="full"
      h="full"
      overflow="x-hidden y-auto"
      flex="~ col"
      z="10"
      p="4"
      bg="accent"
    >
      <div mb="5" flex="~ justify-between items-center">
        <nuxt-link to="/">
          <NuxtImg placeholder src="/logo-alt.svg" w="280px" />
        </nuxt-link>

        <ui-button" size="lg" @click="isExpanded = false"
        icon="i-mingcute-close-line" is-button />
      </div>
      <!-- Nav Items -->

      <div flex="1" overflow-y="auto">
        <DashboardSidePanelNav />
      </div>
    </div>
  </UiSlideover>
</template>

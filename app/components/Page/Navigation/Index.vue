<script lang="ts" setup>
  const showSideBar = ref(false)
  const nuxt = useNuxtApp()
  nuxt.hook("page:finish", () => {
    showSideBar.value = false
  })

  const links = useActivePageLink(MENU_LINKS)
</script>

<template>
  <nav class="relative">
    <!-- Desktop Menu -->
    <div lt-md="hidden" md="block" w="full">
      <UiNavigationMenu
        :ui="{
          viewport: 'w-[var(--reka-navigation-menu-viewport-width)]'
        }" 
        :items="links"
        highlight
        highlight-color="primary"
        content-orientation="vertical" />
    </div>

    <!-- Mobile Menu Trigger -->
    <UiSlideover side="left" v-model="showSideBar">
      <ui-button
        md="hidden"
        color="neutral"
        size="lg"
        @click="showSideBar = true"
        icon="i-tabler-menu-2"
      />

      <template #content>
        <div class="p-5">
          <UiNavigationMenu
            highlight
            :items="links"
            orientation="vertical"
            highlight-color="primary"
            content-orientation="vertical"
          />
        </div>
      </template>
    </UiSlideover>

  </nav>
</template>

<style lang="css" scoped>
  .menuitem .submenu {
    display: none;
  }

  .menuitem:hover .submenu {
    display: block;
  }
</style>

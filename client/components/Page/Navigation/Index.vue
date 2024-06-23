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
    <div lt-md="hidden" md="block" w="full" font="bold" text="xs">
      <ul flex="~ gap-2" w="full">
        <li v-for="item in links" class="menuitem relative">
          <nuxt-link
            :to="item.link"
            :target="
              item.link == '/admin' || item.link == '/staff' ? '__blank' : ''
            "
            bg="hover:accent/6"
            rounded="md"
            p="x3 y2"
            :class="item.isActive ? 'c-accent' : 'c-content-200'"
          >
            {{ item.label }}
          </nuxt-link>

          <!-- dropdown menu -->
          <div
            v-if="item.children"
            class="submenu absolute"
            mt="2"
            right="0"
            rounded="md"
            shadow="~"
            bg="base-200"
          >
            <ul class="space-y-2 w-48" p="2">
              <li v-for="subItem in item.children">
                <nuxt-link
                  :to="subItem.link"
                  flex="~"
                  bg="hover:accent/6"
                  p="2"
                  rounded="md"
                  :class="item.isActive ? 'c-accent' : 'c-content-200'"
                >
                  {{ subItem.label }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <!-- Mobile Menu Trigger -->
    <ui-button
      md="hidden"
      color="gray"
      size="lg"
      @click="showSideBar = true"
      icon="i-tabler-menu-2"
    />

    <!-- Mobile Menu -->
    <UiSlideover side="left" v-model="showSideBar">
      <div
        relative
        w="full"
        h="full"
        overflow="x-hidden y-auto"
        flex="~ col"
        z="10"
      >
        <div p="5" flex="~ justify-end items-center">
          <ui-button
            color="gray"
            size="lg"
            @click="showSideBar = false"
            icon="i-mingcute-close-line"
            is-button
          />
        </div>
        <!-- Nav Items -->

        <ul
          w="full"
          flex="1 ~ col gap-1"
          text="sm"
          font="bold"
          overflow="y-auto x-hidden"
          c="content-200"
        >
          <li v-for="item in links" p="x5">
            <nuxt-link
              :to="item.link"
              class="block focus-accent-outline!"
              w="full"
              p="x3 y2"
              hover="bg-accent/10"
              :class="item.isActive ? 'c-accent' : 'c-content-200'"
            >
              {{ item.label }}
            </nuxt-link>

            <!-- Render children if it's dropdown -->
            <ul v-if="item.children" w="full" text="xs content-300">
              <li v-for="subItem in item.children" p="x5">
                <nuxt-link
                  :to="subItem.link"
                  class="block"
                  w="full"
                  p="x3 y2"
                  hover="bg-accent/10"
                  :class="item.isActive ? 'c-accent' : 'c-content-200'"
                >
                  {{ subItem.label }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
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

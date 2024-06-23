<script lang="ts" setup>
  const menuConfig = computed(() => {
    const user = useAuthStore().getAuthUser
    return user.role == "Admin"
      ? { links: ADMIN_SIDE_NAV_LINKS, root: "/admin" }
      : { links: STAFF_SIDE_NAV_LINKS, root: "/staff" }
  })

  const links = useActivePageLink(menuConfig.value.links, menuConfig.value.root)
</script>

<template>
  <ul w="full" flex="~ col gap-4" justify="center">
    <li v-for="item in links">
      <nuxt-link
        :to="item.link"
        flex="~ gap-1"
        items="center"
        rounded="md"
        hover="bg-base-300 c-accent"
        class="focus:accent-outline"
        c="white"
        :class="item.isActive ? 'bg-accent-dark' : ''"
      >
        <div w="10" h="10" flex="center">
          <div :class="item.icon" text="lg" />
        </div>

        <span block text="sm" line-clamp="1">
          {{ item.label }}
        </span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
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
    <nuxt-link block p="1" bg="white/60" rounded="md" to="/">
      <img
        alt="Kebbi Ministry for Basic and Secondary Education Logo"
        src="/logo.png"
      />
    </nuxt-link>

    <!-- Navigation -->
    <DashboardSidePanelNav />
  </aside>
</template>

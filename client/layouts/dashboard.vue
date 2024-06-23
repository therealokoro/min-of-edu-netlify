<template>
  <div
    class="relative"
    w="screen"
    h="screen"
    flex="~"
    bg="base-300"
    text="content-200"
    font="main"
    overflow="hidden"
  >
    <NuxtLoadingIndicator />

    <!-- Side Panel - The Side Panel is hidden once the screen is smaller than the lg breakpoint  -->
    <DashboardSidePanel />

    <!-- Rest of the page -->
    <div flex="1">
      <!-- Dashboard Top Bar -->
      <DashboardTopBar />

      <!-- Main Page Content -->
      <div class="body-content">
        <div h="full" auto="container" p="y6" overflow="auto">
          <slot />
        </div>
      </div>
    </div>

    <ClientOnly>
      <BaseNotifications />
    </ClientOnly>
  </div>
</template>

<style scoped>
  .body-content {
    --at-apply: "w-full h-[calc(100%_-_var(--dashboard-top-bar-height))]";
  }
</style>

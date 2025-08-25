<script lang="ts" setup></script>

<template>
  <div
    w="full"
    flex="~ center col"
    min-h="screen"
    text="content-200"
  >
    <div auto-container space-y="4">
      <PageLogo w="300px" mx="auto" />
      <slot />
    </div>

    <ClientOnly>
      <BaseNotifications />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup></script>

<template>
  <div w="full" flex="~ col" font="main" min-h="screen" bg="base-200">
    <NuxtLoadingIndicator color="#139B48" />

    <PageHeader shrink="0" />

    <!-- Main Body -->
    <PageBody flex="1">
      <slot />
    </PageBody>

    <!-- Footer -->
    <PageFooter shrink="0" />

    <ClientOnly>
      <BaseNotifications />
    </ClientOnly>
  </div>
</template>

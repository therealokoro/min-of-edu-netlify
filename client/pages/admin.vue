<script lang="ts" setup>
  definePageMeta({ middleware: ["admin-only"], layout: "dashboard" })
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

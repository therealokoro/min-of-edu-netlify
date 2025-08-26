<script lang="ts" setup>
  definePageMeta({ auth: { only: "staff" }, layout: "dashboard" })
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

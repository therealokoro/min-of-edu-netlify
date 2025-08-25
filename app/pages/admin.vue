<script lang="ts" setup>
  definePageMeta({ auth: { only: "admin" }, layout: "dashboard" })
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

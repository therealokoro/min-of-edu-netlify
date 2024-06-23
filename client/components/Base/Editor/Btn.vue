<script setup lang="ts">
  defineProps<{
    pressed: boolean
    disabled?: boolean
    onClick: VoidFunction
    icon?: string
  }>()
</script>

<template>
  <ui-button
    :icon="icon"
    :variant="pressed ? 'solid' : 'soft'"
    @click="onClick"
    :disabled="disabled"
    size="lg"
    color="black"
  />
</template>

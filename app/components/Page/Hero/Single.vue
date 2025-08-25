<script lang="ts" setup>
  defineProps<{ heading: string; description?: string }>()
</script>

<template>
  <section
    relative
    w="full"
    h="50vh"
    bg="base-300"
    flex="center"
    overflow="hidden"
  >
    <IconsKebbiMap absolute w="70" opacity="50" />

    <div flex="center col gap-1" text="center" z="10">
      <h1 text="xl md:3xl" font="extrabold">{{ heading }}</h1>
      <p v-if="description" text="xs content-300" font="semibold">
        {{ description }}
      </p>
    </div>
  </section>
</template>

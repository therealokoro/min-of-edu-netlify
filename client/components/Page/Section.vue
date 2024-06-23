<script lang="ts" setup>
  const { whiteText = false } = defineProps<{
    heading?: string
    description?: string
    whiteText?: boolean
  }>()
  const textColor = computed(() =>
    whiteText ? "text-white" : "text-content-200"
  )
</script>

<template>
  <section w="full" h="auto" py="20" space-y="15">
    <div v-if="heading" auto-container w="full" flex="col center" text="center">
      <h3 text="xl md:3xl" :class="textColor" font="extrabold">
        {{ heading }}
      </h3>
      <p text="xs" :class="textColor" font="semibold">
        {{ description }}
      </p>
    </div>

    <div auto-container>
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { H3Error } from "h3"
  const {
    title,
    spacing = true,
    error
  } = defineProps<{
    title?: string
    spacing?: boolean | string
    error?: Error | H3Error | null
  }>()

  // resolve gap within content
  const contentGap = computed(() => {
    return spacing ? (typeof spacing == "string" ? spacing : "space-y-5") : ""
  })

  // compute error info
  const errInfo = computed(() => {
    if (error) {
      const message =
        error instanceof H3Error ? error.statusMessage : error.message
      const code = error instanceof H3Error ? error.statusCode : 400
      return { message, code }
    } else {
      return null
    }
  })

  const pageTitle = computed(() =>
    error
      ? error instanceof H3Error
        ? error.statusMessage
        : error.message
      : title
  )
</script>

<template>
  <div w="full">
    <!-- Set current page title -->
    <Title>{{ pageTitle }}</Title>

    <slot name="hero" />

    <div v-if="error" w="full" pt="20" flex="col center gap-2">
      <!-- error code -->
      <h1 text="4xl lg:4xl" font="extrabold">{{ errInfo!.code }}</h1>
      <!-- error details -->
      <div text="centert">
        <h3 text="sm md:lg accent-200" font="medium">
          {{ errInfo!.message }}
        </h3>
      </div>
    </div>

    <!-- Acutal Page Content -->
    <main v-else :class="contentGap">
      <slot />
    </main>
  </div>
</template>

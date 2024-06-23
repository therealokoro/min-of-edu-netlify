<script lang="ts" setup>
  defineProps<{
    heading?: string | boolean
    description?: string
    loading?: boolean
  }>()
</script>

<template>
  <div w="auto" flex="~ col gap-4" bg="base-200" p="5" rounded="lg">
    <!-- if heading is provided -->
    <div v-if="heading" w="full" flex="~ wrap horizontal gap-3" mb="5">
      <div v-if="typeof heading == 'string'" space="y-0.5">
        <h3 font="bold" text="xs md:sm">{{ heading }}</h3>
        <h4 font="medium" text="content-100 xxs md:xs">{{ description }}</h4>
      </div>

      <slot name="extra" />
    </div>

    <div v-if="loading" flex="1" space-y="3">
      <UiSkeleton h="4" w="full" />
      <UiSkeleton h="4" w="full" />
      <UiSkeleton h="4" w="full" />
    </div>

    <div v-else>
      <slot name="default" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{ data: object; double?: boolean }>()
</script>

<template>
  <dl
    w="full"
    :class="{ 'grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-3': double }"
  >
    <div
      border-b="1 gray-100"
      v-for="(value, label) in data"
      p="3"
      grid="~ cols-3"
      capitalize
    >
      <dt text="sm accent" font="bold" leading="6">
        {{ label }}
      </dt>
      <dd text="sm" font="medium" leading="6" col="span-2">
        {{ value }}
      </dd>
    </div>
  </dl>
</template>

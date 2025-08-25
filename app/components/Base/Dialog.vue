<script lang="ts" setup>
  const isOpen = defineModel<boolean>({ required: true })
  defineProps<{ title: string }>()
  defineEmits(['close'])
</script>

<template>
  <UiModal v-model:open="isOpen" v-bind="$attrs" @close="$emit('close')">
    <template #content>
      <UiCard
        class="flex flex-col flex-1"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 text="content-200" font="main" class="font-semibold leading-6">
              {{ title }}
            </h3>
            <UiButton
              color="neutral"
              variant="ghost"
              icon="i-tabler-x"
              class="text-lg"
              @click="isOpen = false"
            />
          </div>
        </template>
        <template #default>
          <div p="2" font="main" text="content-200">
            <slot />
          </div>
        </template>
      </UiCard>
    </template>
  </UiModal>
</template>

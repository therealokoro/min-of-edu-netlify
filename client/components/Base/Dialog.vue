<script lang="ts" setup>
  const isOpen = defineModel<boolean>({ required: true })
  defineProps<{ title: string }>()
  defineEmits(['close'])
</script>

<template>
  <UiModal v-model="isOpen" v-bind="$attrs" @close="$emit('close')">
    <UiCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100'
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 text="content-200" font="main" class="font-semibold leading-6">
            {{ title }}
          </h3>

          <UiButton
            color="gray"
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
  </UiModal>
</template>

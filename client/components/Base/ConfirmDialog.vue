<script lang="ts" setup>
  const isOpen = defineModel<boolean>({ required: true })
  const { title = "Confirm Dialog" } = defineProps<{
    title?: string
    message: string
  }>()

  defineEmits(["confirm", 'close'])
</script>

<template>
  <UiModal v-model="isOpen" @close="$emit('close')">
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
        <div p="2" font="main">
          <h3 text="center">{{ message }}</h3>
        </div>
      </template>

      <template #footer>
        <div flex="~ center gap-2">
          <ui-button @click="$emit('confirm')">Confirm</ui-button>
          <ui-button @click="isOpen = false" color="red">Cancel</ui-button>
        </div>
      </template>
    </UiCard>
  </UiModal>
</template>

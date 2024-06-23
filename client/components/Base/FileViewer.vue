<script lang="ts" setup>
  import type { IUploadedFile } from "~/types/file.type"
  defineProps<{ files: IUploadedFile[]; showDelete?: boolean }>()
  defineEmits(["delete-item"])
</script>

<template>
  <div w="full" grid="~ cols-2 md:cols-3 lg:cols-4 gap-7">
    <div
      flex="center col gap-4"
      bordered
      relative
      rounded="lg"
      p="y10"
      v-for="item in files"
      target="__blank"
    >
      <ui-button
        v-if="showDelete"
        absolute
        top="2"
        right="2"
        text="lg"
        color="gray"
        variant="soft"
        icon="i-tabler-trash"
        @click="$emit('delete-item', item.id)"
      />
      <div class="i-mingcute-file-line" text="3xl" />
      <div space-y="1" text="xs center">
        <p font="bold">{{ item.name }}</p>
        <ui-button
          v-if="item.url"
          variant="soft"
          :to="item.url"
          target="__blank"
        >
          <span text="xs">Click to view</span>
        </ui-button>
        <p v-else>No was file uploaded</p>
      </div>
    </div>
  </div>
</template>

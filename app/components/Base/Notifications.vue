<script lang="ts" setup>
import { Notivue } from "notivue"
</script>

<template>
  <Notivue v-slot="item">
    <div
      role="alert"
      :data-notivue="item.type"
      :id="item.id"
      max-w="full"
      flex="horizontal"
      bg="base-200"
      rounded="md"
      shadow="sm dark:lg"
      bordered
      p="3"
    >
      <div flex="~ gap-2" items="center">
        <div class="icon" />

        <p text="xs md:sm content-200" font="semibold">{{ item.message }}</p>
        <span class="sr-only">{{ item.type }}</span>
      </div>

      <button
        w="5"
        h="5"
        flex="center"
        rounded="md"
        bg="transparent hover:base-300"
        m="l7"
        focus-accent-outline
        @click="item.clear()"
      >
        <div class="i-tabler-x" />
      </button>
    </div>
  </Notivue>
</template>

<style scoped>
[data-notivue="success"] .icon,
[data-notivue="promise-resolve"] .icon {
  --uno: "c-green i-mingcute-check-circle-fill";
}

[data-notivue="error"] .icon,
[data-notivue="promise-reject"] .icon {
  --uno: "c-red i-mingcute-close-circle-fill";
}

[data-notivue="warning"] .icon {
  --uno: "c-orange i-mingcute-warning-fill";
}

[data-notivue="info"] .icon {
  --uno: "c-blue i-mingcute-information-fill";
}

[data-notivue="promise"] .icon {
  --uno: "c-content-200 i-svg-spinners-270-ring-with-bg";
}
</style>

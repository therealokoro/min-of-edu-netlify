<script setup lang="ts">
  const props = defineProps({
    context: {
      type: Object,
      required: true
    }
  })

  const initialValue = computed(() => {
    if (props.context.value && Array.isArray(props.context.value)) {
      return props.context.value
    } else return []
  })

  const tags = ref<string[]>(initialValue.value)
  const newTag = ref<string>("")

  onMounted(() => {
    watch(
      () => props.context.value,
      (newValue) => {
        tags.value = newValue
      }
    )
  })

  const addTag = () => {
    if (newTag.value.trim() !== "") {
      tags.value = [...tags.value, newTag.value.trim()]
      newTag.value = ""
      props.context.node.input(tags.value)
    }
  }

  const removeTag = (index: number) => {
    tags.value.splice(index, 1)
    props.context.node.input(tags.value)
  }
</script>

<template>
  <div w="full" flex="~ col gap-2">
    <input
      type="text"
      :placeholder="props.context.placeholder"
      v-model="newTag"
      class="input-field"
      @keydown.enter.prevent="addTag"
    />

    <div flex="1 ~ wrap gap-2">
      <UiBadge v-for="(item, i) in tags">
        <span>{{ item }}</span>
        <button @click.prevent="removeTag(i)" ml="2" class="i-tabler-x" />
      </UiBadge>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    context: {
      type: Object,
      required: true
    }
  })

  const inputValue = ref("")

  watch(inputValue, (val: any) => {
    props.context.node.input(val)
  })
</script>

<template>
  <UiFormGroup
    :help="props.context.help"
    :label="props.context.label"
    :required="props.context.required"
    
  >
    <UiInput
      :name="props.context.name"
      v-model="inputValue"
      :type="props.context.variant"
      :placeholder="props.context.placeholder"
    />
  </UiFormGroup>
</template>

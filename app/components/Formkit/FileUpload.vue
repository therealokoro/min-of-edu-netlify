<script lang="ts" setup>
  const props = defineProps({
    context: { type: Object, required: true }
  })

  const selectedFile = ref<File | null>(null)
  const errorMessage = ref<string>("")

  // Clear all previous selection
  function resetAllStates() {
    selectedFile.value = null
    errorMessage.value = ""
  }

  function validateFile(file: File) {
    const extensions = props.context.accepts as string
    const maxSize = props.context.size as number
    const valid = ref(true)

    // check the file extension
    if (extensions) {
      const exts = extensions.split("|")
      const fileExt = String(file.name.split(".").pop())

      // check file extension
      if (!exts.includes(fileExt)) {
        errorMessage.value = "File type is not supported"
        valid.value = false
      }
    }

    // check file size
    if (maxSize) {
      if (file.size > maxSize) {
        errorMessage.value = "File size is too large"
        valid.value = false
      }
    }

    return valid
  }

  // init file selection
  const { open: openDialog, onChange: onFileSelected } = useFileDialog({
    multiple: false
  })

  // listen for when file is selected
  onFileSelected((files: any) => {
    resetAllStates()

    // validate selected file
    if (files) {
      const isValid = validateFile(files[0])
      if (!isValid.value) return false
      selectedFile.value = files[0]
    }
  })

  // watch for when a file is stored
  watch(selectedFile, async (file) => {
    // send file as input value
    if (file) props.context.node.input(file)
  })
</script>

<template>
  <div
    w="full"
    flex="~ gap-2"
    items="center"
    p="1.5"
    input-field
    focus-within="accent-outline"
  >
    <ui-button @click="openDialog()" secondary> Choose File </ui-button>

    <!-- Show possible error message -->
    <p v-if="errorMessage != ''" text="xxs red-400" font="medium">
      {{ errorMessage }}
    </p>

    <!-- File Name / Info -->
    <p v-else text="xs content-300">
      <span v-if="context._value">{{ context._value.name }}</span>
      <span v-else>Select a file to upload</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
const dropzoneEl = ref<HTMLElement>()
const selectedFile = ref<File | null>(null)
const imageFilePreview = ref<string | null>(null)
const errorMessages = ref<string[]>([])

const props = defineProps({
  context: {
    type: Object,
    required: true
  }
})

// Clear all previous selection
function resetAllStates() {
  selectedFile.value = null
  imageFilePreview.value = null
  errorMessages.value = []
}

function validateFile(file: File) {
  const extensions = props.context.attrs.accept as string
  const maxSize = props.context.size as number
  const valid = ref(true)

  if (extensions) {
    const exts = extensions.split("|")
    const fileExt = String(file.name.split(".").pop())

    // check file extension
    if (!exts.includes(fileExt)) {
      errorMessages.value.push("File type is not supported")
      valid.value = false
    }
  }

  // check file size
  if (maxSize) {
    if (file.size > maxSize) {
      errorMessages.value.push("File size is too large")
      valid.value = false
    }
  }

  return valid
}

// listen for when file is dropped
function onFileDrop(files: File[] | null) {
  // clear all recent file selections
  resetAllStates()

  if (files) {
    // validate selected file
    const isValid = validateFile(files[0])
    if (!isValid.value) return false

    // Store, if drop item is file
    selectedFile.value = files[0]
  }
}

// init dropzone function
const { isOverDropZone } = useDropZone(dropzoneEl, onFileDrop)

// init file selection
const { open: openDialog, onChange: onFileSelected } = useFileDialog({
  multiple: false
})

// listen for when file is selected
onFileSelected(files => {
  resetAllStates()

  if (files) {
    // validate selected file
    const isValid = validateFile(files[0])
    if (!isValid.value) return false

    selectedFile.value = files[0]
  }
})

// watch for when a file is stored
watch(selectedFile, async file => {
  if (file) {
    // if file is an image, set preview
    if (file.type.split("/")[0] == "image") {
      const { promise } = useBase64(file)
      imageFilePreview.value = await promise.value
    }

    // send file as input value
    props.context.node.input(file)
  }
})
</script>

<template>
  <div
    class="w-70 h-70 bordered border-dashed p-4"
    rounded="xl"
    text="center"
    flex="center"
    ref="dropzoneEl"
    :class="isOverDropZone ? 'bg-base-300' : 'bg-base-200'"
  >
    <!-- File Placeholder -->
    <div flex="~ col center gap-3" v-if="!selectedFile">
      <div text="5xl content-100" class="i-tabler-cloud-upload" />
      <h3 text="xs">Drag and drop a file here to upload</h3>
      <button
        @click="openDialog()"
        class="focus:accent-outline"
        text="xxs content-100"
        p="1"
      >
        Click to select file
      </button>

      <!-- Show possible error messages -->
      <div
        v-if="errorMessages.length"
        w="full"
        flex="~ col gap-1"
        items="center"
      >
        <p
          text="xxs red-400"
          font="medium"
          v-for="error in errorMessages"
        >
          {{ error }}
        </p>
      </div>
    </div>

    <!-- Show file preview -->
    <div v-else flex="~ col center gap-3">
      <!-- Image Preview/Icon -->
      <div w="20" flex="center">
        <nuxt-img v-if="imageFilePreview" :src="imageFilePreview" />
        <div v-else class="i-tabler-file" text="4xl content-100" />
      </div>

      <!-- File Name / Info -->
      <p text="xs" font="semibold">{{ context._value?.name }}</p>

      <!-- Delete File Button -->
      <button
        text="xxs accent-200"
        p="1"
        flex="center gap-1"
        @click="resetAllStates()"
      >
        <div i-tabler-trash />
        <span>Delete File</span>
      </button>
    </div>
  </div>
</template>

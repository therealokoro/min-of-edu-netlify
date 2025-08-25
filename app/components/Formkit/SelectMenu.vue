<script setup lang="ts">
  type SelectOption = {
    label: string
    value: string
    disabled: boolean
    id: number
  }

  const props = defineProps({
    context: {
      type: Object,
      required: true
    }
  })

  // Resolve options to be rendered
  const renderOptions = computed(() => {
    return [...props.context.options].map((option, i) => {
      return typeof option == "string"
        ? { label: option, value: option, id: i, disabled: false }
        : { label: option.label, value: option.value, id: i }
    }) as SelectOption[]
  })

  // get initial value from v-model
  const initialOption = computed(() => {
    return (
      renderOptions.value.find((curr) => curr.value == props.context.value) ||
      null
    )
  })

  // Hold raw selected option data
  const selectedOption = ref<SelectOption | null>(initialOption.value)

  // Hold label of selected option to be displayed
  const displaySelected = ref<string | null>(null)

  // Handle File Selected
  watch(selectedOption, (opt) => {
    props.context.node.input(opt!.value)
    displaySelected.value = opt!.label
  })

  const isOpen = ref(false)
  const searchTerm = ref("")
  const filteredOptions = computed(() => {
    return renderOptions.value.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })

  const toggleDropdown = () => (isOpen.value = !isOpen.value)

  const selectOption = (option: SelectOption) => {
    selectedOption.value = option
    isOpen.value = false // Close the dropdown after selecting an option
    searchTerm.value = ""
  }

  const filterOptions = () => {
    isOpen.value = true // Open dropdown on search
  }

  const selectWrapper = ref(null)

  onClickOutside(selectWrapper, () => (isOpen.value = false))
</script>

<template>
  <div class="relative" ref="selectWrapper">
    <div @click="toggleDropdown" class="input-field" flex="~ items-center">
      {{ selectedOption ? selectedOption.label : props.context.placeholder }}
    </div>

    <input
      v-model="searchTerm"
      @input="filterOptions"
      v-show="isOpen"
      w="full"
      p="2"
      border="2 base-100"
      text="sm"
      type="text"
      placeholder="Search for an item..."
    />
    <ul
      v-show="isOpen"
      class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg"
      text="sm"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="selectOption(option)"
        class="cursor-pointer py-2 px-3 hover:bg-gray-100"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

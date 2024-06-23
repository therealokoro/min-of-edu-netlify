<script lang="ts" setup>
  const { stats } = defineProps<{ stats: { [x: string]: string } }>()
  const countUpRefs = useTemplateRefsList<HTMLDivElement>()
  const statsSection = ref(null)
  const targetIsVisible = useElementVisibility(statsSection)

  const keys = {
    schools: "No. of Schools",
    teachers: "No. of Teachers",
    students: "No. of Students",
    lgas: "No. of LGAs"
  }

  const renderList = computed(() => {
    return Object.entries(keys).map(([key, value]) => ({
      label: value,
      value: Number(stats[key])
    }))
  })

  onMounted(() => {
    watchOnce(targetIsVisible, () => {
      const duration = 1000

      countUpRefs.value.forEach((el) => {
        const start = 0
        const end = Number(el.dataset.count)
        const increment = end / (duration / 16)

        let currentValue = start
        const updateValue = () => {
          if (currentValue < end) {
            currentValue += increment
            el.textContent = String(Math.round(currentValue))
            requestAnimationFrame(updateValue)
          } else {
            el.textContent = String(end)
          }
        }
        requestAnimationFrame(updateValue)
      })
    })
  })
</script>

<template>
  <PageSection bg="accent-dark" ref="statsSection">
    <div w="full" grid="~ cols-2 md:cols-4 gap-7">
      <div v-for="item in renderList" text="center" space-y="3" flex="center col">
        <div
          w="25"
          h="25"
          flex="center"
          border="3 white"
          rounded="full"
          text="white xl"
          font="extrabold"
          :data-count="item.value"
          :ref="countUpRefs.set"
        >
          {{ item.value }}
          
        </div>
        <p text="white/90" font="bold">{{ item.label }}</p>
      </div>
    </div>
  </PageSection>
</template>

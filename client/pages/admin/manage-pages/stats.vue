<script lang="ts" setup>
  const { data: stats } = await useAsyncData(async () => {
    const content = await $fetch("/api/content/get")
    return (content?.statsCount as {}) || {}
  })

  const formData = computed(() => stats.value || {})

  const $toast = usePush()
  async function handleUpdateStats(data: any) {
    const toast = $toast.promise("Please wait, updating stats")
    try {
      await $fetch("/api/content/stats/upsert", {
        method: "PUT",
        body: { stats: data }
      })
      toast.resolve("Stats updated successfully")
    } catch (e: any) {
      toast.reject(e)
    }
  }
</script>

<template>
  <Page title="Stats Editor">
    <DashboardContentBlock
      heading="Edit Statistical Value"
      description="You can edit the display value of each stats"
    >
      <FormKit
        type="form"
        :value="formData"
        @submit="handleUpdateStats"
        :submit-attrs="{ inputClass: '!h-9 accent-button' }"
      >
        <div w="full" grid="~ cols-1 md:cols-2 lg:cols-4 gap-5">
          <FormKit type="number" name="schools" label="No. of Schools" />
          <FormKit type="number" name="teachers" label="No. of Teachers" />
          <FormKit type="number" name="students" label="No. of Students" />
          <FormKit type="number" name="lgas" label="No. of LGAs" />
        </div>
      </FormKit>
    </DashboardContentBlock>
  </Page>
</template>

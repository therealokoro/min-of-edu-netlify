<script lang="ts" setup>
  const createScreening = ref(false)
  const { ScreeningInfo } = useFormSchemas()
  const $toast = usePush()

  const {
    data: screeningList,
    refresh,
    pending
  } = await useAsyncData("staff-list", async () => {
    const list = await $fetch("/api/screening/list")
    return list.map((item, i) => ({
      ...item,
      sn: i + 1,
      createdAt: useDateFormat(item.createdAt, "MMMM DD, YYYY").value,
      deadline: useDateFormat(item.deadline, "MMMM DD, YYYY").value
    }))
  })

  async function handleCreateScreening(data: any) {
    const toast = $toast.promise("Creating new verification, please wait")
    try {
      await $fetch("/api/screening/create", {
        method: "POST",
        body: { ...data, requirements: data.requirements.join("|") }
      })
      toast.resolve("New verification was created successfully")
      refresh()
      createScreening.value = false
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Staff Screening">
    <div w="full">
      <ui-button size="sm" @click="createScreening = true">
        Create Verification Excercise
      </ui-button>
    </div>

    <div w="full" bg="base-200" p="5">
      <ScreeningTable :loading="pending" :data="screeningList" />
    </div>

    <BaseDialog title="Create New Verification" v-model="createScreening">
      <FormKit
        type="form"
        @submit="handleCreateScreening"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" grid="~ cols-1 md:cols-2 gap-4">
          <FormKitSchema :schema="ScreeningInfo" />
        </div>
      </FormKit>
    </BaseDialog>
  </Page>
</template>

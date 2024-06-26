<script lang="ts" setup>
  const createStaffModal = ref(false)
  const { AccountInfo } = useFormSchemas()
  const $auth = useAuthStore()
  const $toast = usePush()

  const {
    data: staffList,
    refresh,
    pending
  } = await useAsyncData("staff-list", async () => {
    const list = await $fetch("/api/staffs/list?all=true")
    return list.map((staff, i) => ({
      ...staff,
      sn: i + 1,
      name: useFullname(staff),
      createdAt: useDateFormat(staff.createdAt, "MMMM DD, YYYY").value
    }))
  })

  async function handleSubmit(data: any) {
    const toast = $toast.promise("Creating new staff, please wait")
    try {
      await $auth.registerUser(data)
      toast.resolve("New staff was created successfully")
      refresh()
      createStaffModal.value = false
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Manage Accounts">
    <div w="full">
      <ui-button @click="createStaffModal = true" size="sm">
        Create New Staff
      </ui-button>
    </div>

    <div w="full">
      <div bg="base-200" p="5" w="max" rounded="md" shadow space="y-2">
        <p text="sm" font="semibold">Total Number of Registered Staffs</p>
        <span text="4xl accent" font="extrabold">
          {{ staffList?.length || 0 }}
        </span>
      </div>
    </div>

    <div w="full" bg="base-200" p="5">
      <StaffsTable :data="staffList" :loading="pending" />
    </div>

    <BaseDialog title="Create New Staff" v-model="createStaffModal">
      <FormKit
        type="form"
        id="createStaff"
        @submit="handleSubmit"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" grid="~ cols-1 md:cols-2 gap-5">
          <FormKitSchema :schema="AccountInfo" />
        </div>
      </FormKit>
    </BaseDialog>
  </Page>
</template>

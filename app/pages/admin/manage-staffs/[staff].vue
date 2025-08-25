<script lang="ts" setup>
  const staffId = useRoute("admin-manage-staffs-staff").params.staff
  const $toast = usePush()
  const $staff = useStaffStore()
  const deleteStaff = ref(false)
  const editStaffModal = ref(false)
  const { AccountInfo } = useFormSchemas()

  const {
    data: staffInfo,
    refresh,
    pending
  } = await useAsyncData(`staff-${staffId}`, async () => {
    const info = await $staff.getSingleStaff(staffId)
    if (!info) return null

    return {
      Fullname: info.name,
      "Email Address": info.email,
      "Phone Number": info.phoneNumber,
      "Date Registered": useDateFormat(info.createdAt, "MMMM DD, YYYY").value,
      Role: info.role
    }
  })

  async function handleEditStaff(data: any) {
    const toast = $toast.promise("Updating staff info, please wait")
    try {
      await $staff.updateStaffInfo(staffId, data)
      toast.resolve("Staff info was updated successfully")
      editStaffModal.value = false
      refresh()
    } catch (e: any) {
      toast.reject(e)
    }
  }

  async function handleDeleteStaff() {
    const toast = $toast.promise("Deleting staff info, please wait")
    try {
      await $staff.deleteStaff(staffId)
      toast.resolve("Staff was deleted successfully")
      navigateTo("/admin/manage-staffs")
    } catch (e: any) {
      toast.reject(e)
    }
  }
</script>

<template>
  <Page title="The Staff Name">
    <div w="full" flex="~ gap-2">
      <ui-button @click="editStaffModal = true" size="sm">
        Edit Staff Info
      </ui-button>
      <ui-button
        color="error"
        icon="i-tabler-trash"
        @click="deleteStaff = true"
        size="sm"
      >
        Delete Staff
      </ui-button>
    </div>

    <DashboardContentBlock :loading="pending">
      <div v-if="staffInfo" w="full">
        <BaseDescriptionList double :data="staffInfo" />
      </div>
    </DashboardContentBlock>

    <BaseDialog title="Edit Staff Info" v-model="editStaffModal">
      <FormKit
        type="form"
        :value="$staff.getCurrStaff || {}"
        @submit="handleEditStaff"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" grid="~ cols-1 md:cols-2 gap-5">
          <FormKitSchema :schema="AccountInfo" />
        </div>
      </FormKit>
    </BaseDialog>

    <LazyBaseConfirmDialog
      v-model="deleteStaff"
      message="Are you sure you want to delete this staff?"
      @confirm="handleDeleteStaff"
    />
  </Page>
</template>

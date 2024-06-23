<script lang="ts" setup>
  const createFolderModal = ref(false)
  const $toast = usePush()
  const $staff = useStaffStore()
  const staffList = computed(() => $staff.getStaffList)

  const { data: folderList, refresh } = await useAsyncData(async () => {
    await $staff.fetchStaffList()
    const folders = await $fetch("/api/folder/list")

    return folders.map((curr) => ({
      ...curr,
      title: useFullname(curr.staff),
      url: `/admin/e-files/${curr.id}`
    }))
  })

  // get all staffs for select options
  const selectOptions = computed(() => {
    if (!staffList.value) return []
    return staffList.value?.map((curr) => ({
      label: useFullname(curr),
      value: curr.id
    }))
  })

  const formSchema = ref([
    {
      $formkit: "cselect",
      name: "staffId",
      label: "Select Staff",
      placeholder: "Select the staff to create folder for",
      validation: "required",
      options: selectOptions.value
    }
  ])

  async function handleSubmit(data: any) {
    const toast = $toast.promise("Creating staff folder, please wait")

    try {
      await $fetch("/api/folder/create", { method: "POST", body: data })
      toast.resolve("Staff folder was created succesfully")
      createFolderModal.value = false
      refresh()
    } catch (e:any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Staff E-Files">
    <div w="full">
      <ui-button @click="createFolderModal = true" size="sm">
        Create New Folder
      </ui-button>
    </div>

    <DashboardContentBlock heading="Staff Folders">
      <div
        v-if="folderList?.length"
        w="full"
        grid="~ cols-2 md:cols-3 lg:cols-4 gap-7"
      >
        <nuxt-link
          flex="center col gap-4"
          bordered
          rounded="lg"
          p="y10"
          hover="bg-accent/5"
          v-for="item in folderList"
          :to="item.url"
        >
          <div class="i-mingcute-folder-line" text="3xl" />
          <div space-y="1" text="xs center">
            <p font="bold">{{ item.title }}</p>
            <p text="content-100" font="bold">Click to view</p>
          </div>
        </nuxt-link>
      </div>

      <div v-else flex="center">
        <p text="sm content-100" font="bold">
          You have not created any staff folder yet
        </p>
      </div>
    </DashboardContentBlock>

    <BaseDialog title="Create New Staff" v-model="createFolderModal">
      <FormKit
        type="form"
        id="createStaff"
        @submit="handleSubmit"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <FormKitSchema :schema="formSchema" />
      </FormKit>
    </BaseDialog>
  </Page>
</template>

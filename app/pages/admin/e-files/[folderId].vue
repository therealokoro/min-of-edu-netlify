<script lang="ts" setup>
  const folderId = useRoute("admin-e-files-folderId").params.folderId
  const uploadFileModal = ref(false)
  const deleteFileModal = ref(false)
  const deleteFolderModal = ref(false)
  const $toast = usePush()

  const {
    data: folder,
    refresh,
    pending
  } = await useAsyncData(async () => {
    const res = await $fetch<IStaffFolder>(`/api/folder/${folderId}`)
    return { ...res, title: useFullname(res.staff) }
  })

  // fetch files in folder and compute staff info
  const files = computed(() => (!folder.value ? [] : folder.value.files))
  const staffInfo = computed(() => {
    if (!folder.value) return null
    return {
      Fullname: folder.value.staff.name,
      "Email Address": folder.value.staff.email,
      "Phone Number": folder.value.staff.phoneNumber,
      Role: folder.value.staff.role,
      "Number of Files": files.value?.length || 0
    }
  })

  // compute page title
  const pageTitle = computed(() =>
    folder.value ? folder.value.title + " Files" : "Staff Files"
  )

  // form schema
  const schema = [
    {
      $formkit: "text",
      name: "name",
      label: "File Name",
      placeholder: "Enter a name for the file",
      validation: "required"
    },
    {
      $formkit: "upload",
      name: "file",
      label: "Select File",
      placeholder: "Select a file to upload",
      accepts: "jpg|jpeg|pdf",
      size: "200000",
      validation: "required"
    }
  ]

  // uploads file to server
  async function handleUploadFile(data: any) {
    const toast = $toast.promise("Uploading file please wait...")
    const fd = new FormData()
    fd.append("name", data.name)
    fd.append("file", data.file)
    fd.append("folderId", folderId)

    try {
      await $fetch<IStaffFolder>("/api/folder/file/add", {
        method: "POST",
        body: fd
      })

      refresh()
      toast.resolve("File uploaded succesfully")
      uploadFileModal.value = false
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  // logic to delete a file
  const fileToDeleteId = ref("")
  function initDeleteFile(id: any) {
    fileToDeleteId.value = id
    deleteFileModal.value = true
  }
  async function handleDeleteFile() {
    const toast = $toast.promise("Deleting file please wait...")

    try {
      await $fetch("/api/folder/file/remove", {
        method: "DELETE",
        query: { folderId, fileId: fileToDeleteId.value }
      })

      refresh()
      toast.resolve("File deleted succesfully")
      deleteFileModal.value = false
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  // logic to delete a folder
  async function handleDeleteFolder() {
    const toast = $toast.promise("Deleting staff folder please wait...")

    try {
      await $fetch(`/api/folder/${folderId}`, { method: "DELETE" })
      toast.resolve("Staff folder was deleted succesfully")
      navigateTo("/admin/e-files")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page :title="pageTitle">
    <div w="full" flex="~ gap-2">
      <ui-button @click="uploadFileModal = true" size="sm">
        Upload a file
      </ui-button>
      <ui-button @click="deleteFolderModal = true" size="sm" color="red">
        Delete Folder
      </ui-button>
    </div>

    <DashboardContentBlock heading="Staff Info" :loading="pending">
      <div v-if="staffInfo" w="full">
        <BaseDescriptionList double :data="staffInfo" />
      </div>
    </DashboardContentBlock>

    <DashboardContentBlock heading="Files">
      <BaseFileViewer :files="files" @delete-item="initDeleteFile" />
    </DashboardContentBlock>

    <BaseDialog title="Upload a File" v-model="uploadFileModal">
      <FormKit
        type="form"
        @submit="handleUploadFile"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" space-y="5">
          <FormKitSchema :schema="schema" />
        </div>
      </FormKit>
    </BaseDialog>

    <LazyBaseConfirmDialog
      v-model="deleteFileModal"
      message="Are you sure you want to delete this file?"
      @confirm="handleDeleteFile"
    />

    <LazyBaseConfirmDialog
      v-model="deleteFolderModal"
      message="Are you sure you want to delete this staff folder?"
      @confirm="handleDeleteFolder"
    />
  </Page>
</template>

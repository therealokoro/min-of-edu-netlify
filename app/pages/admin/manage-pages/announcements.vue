<script lang="ts" setup>
  const $toast = usePush()
  const upsertModal = ref(false)
  const deleteModal = ref(false)

  const {
    data: announcements,
    pending,
    refresh
  } = await useFetch("/api/announcement/list")

  const renderList = computed(() => {
    if (!announcements.value) return []
    return announcements.value.map((curr, i) => ({
      sn: i + 1,
      title: curr.title,
      body: curr.body,
      id: curr.id,
      createdAt: useDateFormat(curr.createdAt, "MMMM DD, YYYY").value
    }))
  })

  const activeAnnouncement = ref<any>(null)
  function initAction(data: any, action: "delete" | "edit") {
    activeAnnouncement.value = data
    if (action == "delete") deleteModal.value = true
    else upsertModal.value = true
  }

  async function handleUpsert(data: any) {
    const toast = $toast.promise("Creating announcement, please wait")
    try {
      await $fetch("/api/announcement/upsert", { method: "POST", body: data })
      toast.resolve("Announcement was created successfully")
      upsertModal.value = false
      refresh()
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  async function handleDeleteAnnouncement() {
    const toast = $toast.promise("Deleting announcement, please wait")
    try {
      await $fetch(`/api/announcement/${activeAnnouncement.value.id}`, {
        method: "DELETE"
      })
      toast.resolve("Announcement was deleted successfully")
      deleteModal.value = false
      refresh()
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  const tableColumns = [
    {
      key: "sn",
      label: "S/N"
    },
    {
      key: "title",
      label: "Announcement Title"
    },
    {
      key: "body",
      label: "Body Content"
    },
    {
      key: "createdAt",
      label: "Date Registered"
    },
    {
      key: "actions",
      label: "Actions"
    }
  ]
</script>

<template>
  <Page title="Announcements - Manage Pages">
    <div w="full">
      <ui-button @click="upsertModal = true">Create Announcement</ui-button>
    </div>

    <DashboardContentBlock heading="Announcements List">
      <UiTable :columns="tableColumns" :rows="renderList" :loading="pending">
        <template #actions-data="{ row }">
          <div space-x="2">
            <ui-button @click="initAction(row, 'edit')" size="xs">
              Edit
            </ui-button>

            <ui-button @click="initAction(row, 'delete')" size="xs" color="red">
              Delete
            </ui-button>
          </div>
        </template>
      </UiTable>
    </DashboardContentBlock>

    <BaseDialog title="Announcement Info" v-model="upsertModal">
      <FormKit
        type="form"
        @submit="handleUpsert"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" space="y-5">
          <FormKit
            type="text"
            name="title"
            label="Announcement Title"
            placeholder="Enter announcement title here"
            :value="activeAnnouncement?.title"
            validation="required"
          />

          <FormKit
            type="textarea"
            name="body"
            label="Announcement Body"
            placeholder="Enter announcement body content here"
            :value="activeAnnouncement?.body"
            validation="required"
          />

          <FormKit
            type="hidden"
            name="id"
            :value="activeAnnouncement?.id || ''"
          />
        </div>
      </FormKit>
    </BaseDialog>

    <LazyBaseConfirmDialog
      v-model="deleteModal"
      message="Are you sure you want to delete this announcement?"
      @confirm="handleDeleteAnnouncement"
    />
  </Page>
</template>

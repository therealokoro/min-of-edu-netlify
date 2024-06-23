<script lang="ts" setup>
  import { reset } from "@formkit/vue"
  const upsertModal = ref(false)
  const deleteModal = ref(false)
  const activeProfile = ref<any>(null)
  const isEditAction = ref(false)
  const $toast = usePush()

  const uiMsg = computed(() => (isEditAction.value ? "Edit" : "Create"))

  async function handleUpsertProfile(data: any) {
    const toast = $toast.promise(`${uiMsg.value}ing staff profile, please wait`)

    try {
      const fd = new FormData()
      fd.append("name", data.name)
      fd.append("file", data.file)
      fd.append("position", data.position)

      if (!isEditAction.value) {
        if (!data.file) throw createError("Please select an image")
      } else {
        const imgUrl = activeProfile.value?.imgUrl ?? data.imgUrl
        fd.append("imgUrl", imgUrl)
      }

      activeProfile.value && fd.append("id", activeProfile.value.id)

      await $fetch("/api/profiles/upsert", { method: "POST", body: fd })
      toast.resolve(`Staff profile was ${uiMsg.value}ed successfully`)
      reset("form")
      upsertModal.value = false
      await refresh()
    } catch (e: any) {
      toast.reject(e.data?.message || e.message)
    }
  }

  async function handleDeleteProfile() {
    const toast = $toast.promise("Deleting staff profile, please wait")

    try {
      await $fetch(`/api/profiles/delete`, {
        method: "DELETE",
        query: { id: activeProfile.value!.id }
      })
      toast.resolve("Staff profile was deleted successfully")
      await refresh()
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  function sendAction(profile: any, action: "delete" | "edit") {
    activeProfile.value = profile
    if (action == "delete") deleteModal.value = true
    else if (action == "edit") {
      upsertModal.value = true
      isEditAction.value = true
    }
  }

  function resetAll() {
    isEditAction.value = false
    activeProfile.value = false
    reset("form")
  }

  const { data: profiles, refresh } = await useFetch("/api/profiles/list")
</script>

<template>
  <Page title="Staff Profiles -  Manage Pages">
    <div w="full" space-x="3">
      <ui-button @click="upsertModal = true">Add Staff Profile</ui-button>
    </div>

    <div
      v-if="profiles?.length"
      w="full"
      grid="~ cols-1 md:cols-2 lg:cols-3 gap-5"
    >
      <UiCard v-for="item in profiles" :ui="{ body: 'p-0' }">
        <div h="200px" relative>
          <NuxtImg :src="item.imgUrl" size="full" object="cover" />
        </div>

        <template #footer>
          <div w="full" flex="~ col center gap-1" text="center">
            <h3 line-clamp="1" text="sm" font="bold">{{ item.name }}</h3>
            <p text="xs content-100">{{ item.position }}</p>
          </div>

          <div w="full" flex="center gap-1" mt="2">
            <ui-button
              @click="sendAction(item, 'edit')"
              variant="soft"
              size="xs"
            >
              Edit
            </ui-button>
            <ui-button
              @click="sendAction(item, 'delete')"
              variant="soft"
              size="xs"
              color="red"
            >
              Delete
            </ui-button>
          </div>
        </template>
      </UiCard>
    </div>

    <div v-else w="full" flex="center" p="10">
      <p text="sm" font="bold">You have not created any staff profile yet</p>
    </div>

    <BaseDialog
      :title="`${uiMsg} Staff Profile`"
      v-model="upsertModal"
      @close="resetAll"
    >
      <FormKit
        type="form"
        id="form"
        :value="activeProfile"
        @submit="handleUpsertProfile"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" space-y="5">
          <FormKit
            type="text"
            name="name"
            label="Staff Name"
            placeholder="Enter the staff name here"
            validation="required"
          />
          <FormKit
            type="text"
            name="position"
            label="Staff Position"
            placeholder="Enter the staff position here"
            validation="required"
          />
          <FormKit
            type="upload"
            name="file"
            label="Staff Image"
            placeholder="Select a picture for the staff"
            accepts="jpg|png|jpeg"
            size="1000000"
          />
        </div>
      </FormKit>
    </BaseDialog>

    <LazyBaseConfirmDialog
      v-model="deleteModal"
      title="Confirm Delete"
      message="Are you sure you want to delete this staff profile?"
      @confirm="handleDeleteProfile"
      @close="resetAll"
    />
  </Page>
</template>

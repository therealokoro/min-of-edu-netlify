<script lang="ts" setup>
  import type { IPosting } from "~/types/posting.types"
  const id = useRoute("admin-posting-transfer-postingid").params.postingid
  const currPosting = useState<any>("curr-posting", () => null)
  const $toast = usePush()

  const { data: postingInfo, pending } = await useAsyncData(
    `posting-${id}`,
    async () => {
      const info = await $fetch<IPosting>(`/api/posting/${id}`)
      currPosting.value = info

      if (!info) return null
      return {
        "Staff Name": useFullname(info.staff),
        type: info.type,
        LGEA: info.lga,
        role: info.role,
        institute: info.institute,
        "Date Created": useDateFormat(info.createdAt, "MMMM DD, YYYY").value
      }
    }
  )

  const deletePosting = ref(false)
  async function handleDeletePosting() {
    const toast = $toast.promise("Processing your request, please wait")

    try {
      await $fetch("/api/posting/" + id, { method: "DELETE" })
      toast.resolve("Posting was deleted successfully")
      navigateTo("/admin/posting-transfer")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="">
    <div w="full" space-x="2">
      <ui-button :to="`/admin/posting-transfer/edit-${id}`">
        Edit Posting/Transfer
      </ui-button>
      <ui-button @click="deletePosting = true" color="red">
        Delete Posting/Transfer
      </ui-button>
    </div>

    <DashboardContentBlock :loading="pending">
      <div v-if="postingInfo" w="full">
        <BaseDescriptionList double :data="postingInfo" />
      </div>
    </DashboardContentBlock>

    <DashboardContentBlock heading="Message">
      <p>{{ currPosting.message }}</p>
    </DashboardContentBlock>

    <LazyBaseConfirmDialog
      v-model="deletePosting"
      message="Are you sure you want to delete this posting/transfer record?"
      @confirm="handleDeletePosting"
    />
  </Page>
</template>

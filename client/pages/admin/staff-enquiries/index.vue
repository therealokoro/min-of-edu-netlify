<script lang="ts" setup>
  import type { IFeedback } from "~/types/feedback.types"
  const $auth = useAuthStore()
  const { data: messages } = await useAsyncData("admin-feedbacks", async () => {
    return await $fetch<IFeedback[]>("/api/feedback/list", {
      query: { adminId: $auth.getAuthUser.id }
    })
  })
</script>

<template>
  <Page title="Staff Enquires">
    <DashboardChatPanel :messages="messages || []" />
  </Page>
</template>

<script lang="ts" setup>
  const $auth = useAuth()
  const { data: messages } = await useAsyncData("admin-feedbacks", async () => {
    return await $fetch<IFeedback[]>("/api/feedback/list", {
      query: { adminId: $auth.user.id }
    })
  })
</script>

<template>
  <Page title="Staff Enquires">
    <DashboardChatPanel :messages="messages || []" />
  </Page>
</template>

<script lang="ts" setup>
  const { data: messageList, pending } = await useAsyncData(async () => {
    const list = await $fetch("/api/message/list")
    return list.map((message, i) => ({
      ...message,
      sn: i + 1,
      createdAt: useDateFormat(message.createdAt, "MMMM DD, YYYY").value
    }))
  })
</script>

<template>
  <Page title="Messages">
    <DashboardContentBlock>
      <MessageTable :loading="pending" :data="messageList" />
    </DashboardContentBlock>
  </Page>
</template>

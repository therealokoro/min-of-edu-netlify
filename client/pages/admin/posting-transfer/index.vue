<script lang="ts" setup>
  const { data: postingList, pending } = useAsyncData(
    "staff-posting-list",
    async () => {
      const list = await $fetch("/api/posting/list")
      return list.map((curr, i) => ({
        ...curr,
        sn: i + 1,
        staffName: useFullname(curr.staff),
        createdAt: useDateFormat(curr.createdAt, "MMMM DD, YYYY").value
      }))
    }
  )
</script>

<template>
  <Page title="Posting and Transfer">
    <div w="full" space-x="3">
      <ui-button to="/admin/posting-transfer/new">
        Post/Transfer a Staff
      </ui-button>
    </div>

    <DashboardContentBlock heading="Posting/Transfer History">
      <PostingTable :data="postingList" :loading="pending" />
    </DashboardContentBlock>
  </Page>
</template>

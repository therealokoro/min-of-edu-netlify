<script lang="ts" setup>
  const { data: screeningList, pending } = await useAsyncData(
    "screening-list",
    async () => {
      const list = await $fetch("/api/screening/list")
      return list.map((item, i) => ({
        ...item,
        sn: i + 1,
        createdAt: useDateFormat(item.createdAt, "MMMM DD, YYYY").value,
        deadline: useDateFormat(item.deadline, "MMMM DD, YYYY").value
      }))
    }
  )
</script>

<template>
  <Page title="Staff Screening">
    <div w="full" bg="base-200" p="5">
      <ScreeningTable is-staff :loading="pending" :data="screeningList" />
    </div>
  </Page>
</template>

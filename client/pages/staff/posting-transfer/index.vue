<script lang="ts" setup>
  const user = useAuthStore().getAuthUser
  const { data: postingList, pending } = useAsyncData(
    "staff-posting",
    async () => {
      const list = await $fetch(`/api/posting/list?staffId=${user.id}`)
      return list.map((curr, i) => ({
        id: curr.id,
        title:
          curr.type == "Posting"
            ? "You have been posted"
            : "You have been transfered",
        createdAt: useDateFormat(curr.createdAt, "MMMM DD, YYYY").value
      }))
    }
  )
</script>

<template>
  <Page title="Posting and Transfer">
    <DashboardContentBlock
      :laoding="pending"
      heading="My Posting/Transfer History"
    >
      <div w="full" grid="~ cols-1 md:cols-2 gap-4">
        <nuxt-link
          p="4"
          space-y="2"
          rounded
          bg="base-100 hover:accent/20"
          v-for="item in postingList"
          :to="`/staff/posting-transfer/${item.id}`"
        >
          <h3 font="bold">{{ item.title }}</h3>
          <p text="xs content-100" font="bold">{{ item.createdAt }}</p>
        </nuxt-link>
      </div>
    </DashboardContentBlock>
  </Page>
</template>

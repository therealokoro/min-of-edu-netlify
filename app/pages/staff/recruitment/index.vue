<script lang="ts" setup>
  const { data: list, pending } = await useAsyncData("job-list", async () => {
    const list = await $fetch("/api/recruitment/list")
    return list.map((item, i) => ({
      ...item,
      sn: i + 1,
      createdAt: useDateFormat(item.createdAt, "MMMM DD, YYYY").value
    }))
  })
</script>

<template>
  <Page title="Job Recruitment">
    <DashboardContentBlock :loading="pending" heading="Job Listings">
      <div v-if="list!.length < 1" w="full" flex="center" p="10">
        <p text="sm md:base" font="semibold">
          There are no job postings to display
        </p>
      </div>

      <div v-else w="full" grid="~ cols-1 md:cols-2 gap-5">
        <nuxt-link
          v-for="item in list"
          :to="`/staff/recruitment/${item.id}`"
          bg="accent/4 hover:accent/10"
          flex="~ col gap-2"
          rounded="lg"
          bordered
          p="4"
        >
          <h3 text="base" font="bold">{{ item.jobTitle }}</h3>
          <!-- <p text="sm" line-clamp="1">{{ item.description }}</p> -->
          <span text="xs accent">Posted on {{ item.createdAt }}</span>
        </nuxt-link>
      </div>
    </DashboardContentBlock>
  </Page>
</template>

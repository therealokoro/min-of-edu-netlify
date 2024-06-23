<script lang="ts" setup>
  const { data: recruitmentList } = await useAsyncData(async () => {
    const list = await $fetch("/api/recruitment/list")
    return list.map((item: any, i: any) => ({
      ...item,
      sn: i + 1,
      createdAt: useDateFormat(item.createdAt, "MMMM DD, YYYY").value
    }))
  })
</script>

<template>
  <Page title="E-Recruitment">
    <template #hero>
      <PageHeroSingle
        heading="E-Recruitment"
        description="View all our job openings and apply for the ones that best suites you"
      />
    </template>

    <PageSection
      heading="Job Openings"
      description="Below are a list of all available job openings"
    >
      <div v-if="recruitmentList!.length < 1" w="full" flex="center" p="10">
        <p text="sm md:base" font="semibold">
          There are no job postings to display
        </p>
      </div>

      <div v-else w="full" grid="~ cols-1 md:cols-2 gap-5">
        <nuxt-link
          v-for="item in recruitmentList"
          :to="`/e-recruitment/${item.slug}`"
          bg="accent/4 hover:accent/10"
          flex="~ col gap-2"
          rounded="lg"
          bordered
          p="4"
        >
          <h3 text="base" font="bold">{{ item.jobTitle }}</h3>
          <p text="xs accent">Posted on {{ item.createdAt }}</p>
        </nuxt-link>
      </div>
    </PageSection>
  </Page>
</template>

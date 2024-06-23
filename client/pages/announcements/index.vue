<script lang="ts" setup>
  const { data: announcements } = await useAsyncData(async () => {
    const list = await $fetch("/api/announcement/list")
    return list.map((curr) => ({
      ...curr,
      createdAt: useDateFormat(curr.createdAt, "MMMM DD, YYYY").value
    }))
  })
</script>

<template>
  <Page title="Announcements">
    <template #hero>
      <PageHeroSingle
        heading="Announcements"
        description="Read all our major announcements"
      />
    </template>

    <PageSection max-w="md:80vw" mx="auto">
      <div
        v-if="announcements?.length"
        w="full"
        grid="~ cols-1 md:cols-2 gap-5"
      >
        <nuxt-link
          block
          bg="base-200 hover:base-300"
          p="5"
          rounded
          focus-accent-outline
          v-for="item in announcements"
          :to="`/announcements/${item.slug}`"
          bordered
          space-y="1"
        >
          <h3 line-clamp="2" text="sm">
            {{ item.body }}
          </h3>
          <p text="xs accent" font="bold">{{ item.createdAt }}</p>
        </nuxt-link>
      </div>

      <div v-else w="full" flex="center">
        <p text="sm center" font="bold">
          There are no announcements to display right now
        </p>
      </div>
    </PageSection>
  </Page>
</template>

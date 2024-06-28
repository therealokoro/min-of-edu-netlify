<script lang="ts" setup>
  import type { Announcement } from "@prisma/client"

  const slug = useRoute("announcements-slug").params.slug
  const { data, error } = await useFetch<Announcement>(
    `/api/announcement/${slug}`
  )

  const announcement = computed(() => {
    if (!data.value) return null
    return {
      ...data.value,
      createdAt: useDateFormat(data.value.createdAt, "MMMM DD, YYYY").value
    }
  })

  const pageTitle = computed(() =>
    announcement.value ? announcement.value.title : "Announcement"
  )
</script>

<template>
  <Page :title="pageTitle" :error="error">
    <template #hero>
      <PageHeroSingle
        v-if="announcement"
        :heading="announcement.title"
        :description="announcement.createdAt"
      />
    </template>

    <PageSection v-if="announcement" max-w="70vw" mx="auto">
      <p text="base/10 justify">{{ announcement!.body }}</p>
    </PageSection>
  </Page>
</template>

<script lang="ts" setup>
  import type { News } from "@prisma/client"

  const { data: newsList, pending } = await useFetch<News[]>("/api/news/list")
  const renderList = computed(() => {
    return newsList.value ? newsList.value.splice(0, 3) : []
  })
</script>

<template>
  <PageSection
    v-if="!pending"
    heading="Latest News"
    description="See the latest from our insightful news desk"
  >
    <div w="full" grid="~ cols-1 md:cols-2 lg:cols-3 gap-5">
      <NewsCard v-for="news in renderList" :news="news" />
    </div>

    <div flex="center" p="7">
      <nuxt-link class="text-lg text-accent" font="bold" to="/news">
        View More
      </nuxt-link>
    </div>
  </PageSection>
</template>

<script lang="ts" setup>
  import type { News } from "@prisma/client"
  const { data: newsList } = await useFetch<News[]>("/api/news/list")
  const sliderNews = computed(() => {
    return newsList.value ? newsList.value.splice(0, 4) : []
  })
</script>

<template>
  <Page title="News" p="y-10">
    <NewsSlider v-if="sliderNews.length" :list="sliderNews" />

    <!-- News -->
    <PageSection
      heading="Latest News"
      description="See the latest from our insightful news desk"
    >
      <div
        v-if="newsList?.length"
        w="full"
        grid="~ cols-1 md:cols-2 lg:cols-3 gap-5"
      >
        <NewsCard v-for="news in newsList" :news="news" />
      </div>

      <div v-else w="full" flex="center">
        <p text="sm" font="bold">There are no news to display at the moment.</p>
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
  import type { News } from "@prisma/client"
  defineProps<{ news: News }>()
</script>

<template>
  <nuxt-link
    :to="`/news/${news.slug}`"
    relative
    rounded="lg"
    overflow="hidden"
    class="news-card"
  >
    <NuxtImg
      placeholder
      :src="news.imgUrl"
      :alt="news.title"
      bg="slate-50"
      shadow="md"
      width="1216"
      height="740"
    />

    <div
      absolute
      inset="0"
      w="full"
      h="full"
      bg-gradient="to-t from-gray-900 to-transparent"
      p="5"
      flex="~ col gap-1"
      justify="end"
    >
      <h3 text="white/90 hover:accent" font="bold">
        {{ news.title }}
      </h3>
      <p text="xs white/80">
        {{ news.summary }}
      </p>
      <p text="xs white/50">
        {{ useDateFormat(news.createdAt, "MMMM DD, YYYY").value }}
      </p>
    </div>
  </nuxt-link>
</template>

<style lang="css" scoped>
  .news-card:hover img {
    --uno: "transition ease-in-out scale-150";
  }
</style>

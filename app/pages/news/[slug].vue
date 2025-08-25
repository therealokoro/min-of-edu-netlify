<script lang="ts" setup>
  const slug = useRoute("news-slug").params.slug
  const { data: news, error } = await useFetch<INews>(`/api/news/${slug}`)
  const pageTitle = computed(() => (news.value ? news.value.title : "News"))
</script>

<template>
  <Page :title="pageTitle" p="y-10" :error="error">
    <template #hero>
      <div v-if="news" w="full" flex="col center gap-5">
        <div relative w="40vw">
          <img
            :src="news.imgUrl"
            :alt="news!.title"
            rounded="lg"
            w="full"
            h="full"
            object="cover"
          />
        </div>
        <div w="full" space-y="2" text="center">
          <h1 text="xl md:3xl" font="extrabold">
            {{ news!.title }}
          </h1>
          <h2>{{ news!.summary }}</h2>
          <p text="xs" font="semibold">
            {{ useDateFormat(news!.createdAt, "MMMM DD, YYYY").value }}
          </p>
        </div>
      </div>
    </template>

    <!-- News Content -->
    <PageSection>
      <div
        v-if="news"
        w="70vw"
        mx-auto
        text="justify"
        class="wysiwyq"
        v-html="news!.content"
      />
    </PageSection>
  </Page>
</template>

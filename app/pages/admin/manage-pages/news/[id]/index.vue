<script lang="ts" setup>
  const slug = useRoute("admin-manage-pages-news-id").params.id
  const $toast = usePush()

  const {
    data: news,
    pending,
    error
  } = await useFetch<INews>(`/api/news/single?slug=${slug}`)

  const pageTitle = computed(() => {
    return !news.value
      ? "News - Manage Pages"
      : news.value.title + " | Manage Pages"
  })

  const newsInfo = computed(() => {
    if (!news.value) return {}
    return {
      Title: news.value.title,
      Summary: news.value.summary,
      "Date Published": useDateFormat(news.value.createdAt, "MMMM DD, YYYY")
        .value
    }
  })

  const deleteModal = ref(false)
  async function handleDeleteNews() {
    const toast = $toast.promise("Deleting the news, please wait")

    try {
      await $fetch(`/api/news/delete`, {
        method: "DELETE",
        query: { id: news.value!.id }
      })
      toast.resolve("News was deleted successfully")
      navigateTo("/admin/manage-pages/news")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page :title="pageTitle" :error="error">
    <div w="full">
      <ui-button @click="deleteModal = true" color="error">Delete News</ui-button>
    </div>

    <DashboardContentBlock>
      <div w="full" flex="~ md:row cols gap-5">
        <div flex="1">
          <BaseDescriptionList :data="newsInfo" />
        </div>

        <!-- Image Preview -->
          <div relative size="300px" rounded bg="base-100">
            <img
              :src="news!.imgUrl"
              rounded="lg"
              border="2"
              alt="Image Preview"
              w="full"
              h="full"
              object="cover"
            />
          </div>
      </div>
    </DashboardContentBlock>

    <DashboardContentBlock :loading="pending">
      <div class="wysiwyg" v-html="news!.content" />
    </DashboardContentBlock>

    <LazyBaseConfirmDialog
      v-model="deleteModal"
      title="Confirm Delete"
      message="Are you sure you want to delete this news?"
      @confirm="handleDeleteNews"
    />
  </Page>
</template>

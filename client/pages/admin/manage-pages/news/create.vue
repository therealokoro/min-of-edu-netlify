<script lang="ts" setup>
  const editorContent = ref("")
  const $toast = usePush()

  const selectedImg = shallowRef<any>(null)
  const previewUrl = useObjectUrl(selectedImg)

  async function handlePublishNews(data: any) {
    const toast = $toast.promise("Posting news, please wait")
    try {
      const fd = new FormData()
      fd.append("title", data.title)
      fd.append("summary", data.summary)
      fd.append("content", data.content)
      fd.append("file", data.file)
      fd.append("imgUrl", " ")

      await $fetch("/api/news/upsert", { method: "POST", body: fd })
      toast.resolve("News was successfully posted")
      navigateTo("/admin/manage-pages/news")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Create News">
    <FormKit type="form" :actions="false" @submit="handlePublishNews">
      <DashboardContentBlock heading="Post a News">
        <div flex="~ gap-7 md:row col">
          <div flex="1" space-y="5">
            <FormKit
              type="text"
              name="title"
              label="News Title"
              placeholder="Enter a title for the news here"
              validation="required"
              help="This is the main news headline"
            />
            <FormKit
              type="text"
              name="summary"
              label="News Summary"
              placeholder="Enter a short summary for the news here"
              validation="required"
              help="This will be displayed longside the news title"
            />
            <FormKit
              type="upload"
              name="file"
              label="Cover Photo"
              placeholder="Select a cover photo for the news"
              accepts="pdf|jpg|jpeg"
              size="1000000"
              v-model="selectedImg"
              help="File size must not be more than 1mb"
              validation="required"
            />
            <FormKit
              type="hidden"
              name="content"
              v-model="editorContent"
              validation="required"
            />
          </div>

          <!-- Image Preview -->
          <div relative size="300px" rounded bg="base-100">
            <div
              size="full"
              v-if="!previewUrl"
              flex="center col gap-2"
              text="content-100"
            >
              <div text="4xl" class="i-tabler-photo" />
              <p text="sm">News Cover Image</p>
            </div>

            <NuxtImg
              v-else
              :src="previewUrl"
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

      <DashboardContentBlock>
        <BaseEditor v-model="editorContent" />

        <div w="full" flex="center" mt="5">
          <ui-button type="submit">Publish News</ui-button>
        </div>
      </DashboardContentBlock>
    </FormKit>
  </Page>
</template>

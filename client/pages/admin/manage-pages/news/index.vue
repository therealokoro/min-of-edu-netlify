<script lang="ts" setup>
  const { data, pending } = await useFetch("/api/news/list")

  const newsList = computed(() => {
    if (!data.value) return []
    return data.value.map((curr: any, i: any) => ({
      ...curr,
      sn: i + 1,
      createdAt: useDateFormat(curr.createdAt, "MMMM DD, YYYY").value
    }))
  })

  const columns = [
    { key: "sn", label: "S/N" },
    { key: "title", label: "Title" },
    { key: "summary", label: "Summary" },
    { key: "createdAt", label: "Date Published" },
    { key: "actions", label: "Actions" }
  ]

  const page = ref(1)
  const pageCount = 10
  const renderList = useTablePaginate(newsList.value, page, pageCount)
</script>

<template>
  <Page title="News - Manage Pages">
    <div w="full">
      <ui-button to="/admin/manage-pages/news/create">Post a News</ui-button>
    </div>

    <DashboardContentBlock title="Published News">
      <UiTable :columns="columns" :rows="renderList" :loading="pending">
        <template #actions-data="{ row }">
          <div space-y="2">
            <ui-button
              size="xs"
              :to="`/admin/manage-pages/news/${row.slug}`"
              variant="ghost"
            >
              View
            </ui-button>
            <ui-button
              size="xs"
              :to="`/admin/manage-pages/news/${row.slug}/edit`"
              variant="ghost"
            >
              Edit
            </ui-button>
          </div>
        </template>
      </UiTable>

      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UiPagination
          v-model="page"
          :page-count="pageCount"
          :total="newsList.length"
        />
      </div>
    </DashboardContentBlock>
  </Page>
</template>

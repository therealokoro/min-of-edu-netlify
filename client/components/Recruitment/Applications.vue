<script setup lang="ts">
  import type { IApplication } from "~/types/recruitment.types"
  const rId = useRoute("admin-recruitment-recruitmentid").params.recruitmentid

  type Data = {
    data: IApplication[]
    count: number
  }

  const columns = [
    // {
    //   key: "sn",
    //   label: "ID"
    // },
    {
      key: "name",
      label: "Applicant Name"
    },
    {
      key: "email",
      label: "Email Address"
    },
    {
      key: "status",
      label: "Status",
      sortable: true
    },
    {
      key: "createdAt",
      label: "Application Date"
    },
    {
      key: "actions",
      label: "Actions"
    }
  ]

  const page = ref(1)
  const pageCount = ref(10)
  const searchValue = ref("")

  const url = "/api/recruitment/applications/list"
  // @ts-expect-error
  const { data, pending, refresh } = await useLazyAsyncData<Data>(() => {
    return ($fetch as any)(url, {
      query: {
        id: rId,
        search: searchValue.value,
        limit: pageCount.value,
        page: page.value
      }
    })
  })

  const totalDataCount = computed(() => data.value?.count || 0)
  const applications = computed(() => data.value?.data || [])

  watch([page, searchValue], () => refresh())
</script>

<template>
  <div w="full">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UiInput v-model="searchValue" placeholder="Search for an applicant" />
    </div>

    <UiTable :loading="pending" :columns="columns" :rows="applications">
      <template #actions-data="{ row }">
        <div>
          <ui-button size="2xs" :to="`/admin/recruitment/${rId}/${row.id}`">
            Open
          </ui-button>
        </div>
      </template>

      <template #status-data="{ row }">
        <UiBadge
          :color="getBadgeStyling(row.status).color"
          :label="getBadgeStyling(row.status).text"
          :ui="{ rounded: 'rounded-full' }"
          size="xs"
        />
      </template>
    </UiTable>

    <div w="full" flex="~ items-center justify-end gap-10" my="3">
      <p text="xs" font="bold">
        Total Number of Applications: {{ totalDataCount }}
      </p>
      <UiPagination
        v-model="page"
        :page-count="pageCount"
        :total="totalDataCount"
        :max="7"
      />
    </div>
  </div>
</template>

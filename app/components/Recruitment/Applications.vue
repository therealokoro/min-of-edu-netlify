<script setup lang="ts">
import { UiButton, UiInput, UiTable, UiPagination } from '#components'
import type { TableColumn } from '@nuxt/ui'
import { h } from 'vue'

const route = useRoute("admin-recruitment-recruitmentId")
const rId = route.params.recruitmentId as string

type Data = {
  data: IApplication[]
  count: number
  limit: number
  page: number
}

const table = useTemplateRef('table')
const searchValue = ref("")
const pagination = ref({ pageIndex: 1, pageSize: 10 })

// Columns definition
const columns: TableColumn<IApplication>[] = [
  { accessorKey: "name", header: "Applicant Name" },
  { accessorKey: "email", header: "Email Address" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "createdAt",
    header: "Application Date",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return h(
        UiButton,
        {
          color: 'neutral',
          variant: 'ghost',
          class: 'ml-auto',
          onClick: () => {
            navigateTo(`/admin/recruitment/${rId}/${row.original.id}`)
          }
        },
        { default: () => "View" }
      )
    }
  }
]

function fetchDataFromServer(){
  return $fetch("/api/recruitment/applications/list", {
    query: {    
      id: rId,
      search: searchValue.value,
      limit: pagination.value.pageSize,
      page: pagination.value.pageIndex
    }
  })
}

// Fetching data
const key = computed(() => `applications-${rId}-${pagination.value.pageIndex}`)
const { data, status, refresh } = await useLazyAsyncData(key, () => fetchDataFromServer())

const totalDataCount = computed(() => data.value?.count ?? 0)
const applications = computed(() => data.value?.data ?? [])

// Handle pagination
async function fetchNewPage(page: number) {
  pagination.value.pageIndex = page
  console.log(pagination.value)
  await refresh()
}

// Handle search
watchDebounced(searchValue, () => {
    pagination.value.pageIndex = 1 // reset to first page on new search
    refresh()
  },
  { debounce: 500, maxWait: 1000 }
)
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <!-- Search -->
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UiInput v-model="searchValue" placeholder="Search for an applicant" />
    </div>

    <!-- Table -->
    <UiTable
      ref="table"
      :loading="status == 'pending'"
      loading-color="primary"
      v-model:pagination="pagination"
      :data="applications"
      :columns="columns"
      :pagination-options="{
        manualPagination: true,
        pageCount: Math.ceil(totalDataCount / pagination.pageSize)
      }"
      class="flex-1"
    />

    <!-- Pagination -->
    <div class="flex justify-center border-t border-default pt-4">
      <UiPagination
        :total="totalDataCount"
        :default-page="pagination.pageIndex"
        :items-per-page="pagination.pageSize"
        @update:page="fetchNewPage"
      />
    </div>
  </div>
</template>

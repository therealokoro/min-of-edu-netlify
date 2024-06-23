<script setup lang="ts">
  const rId = useRoute("admin-recruitment-recruitmentid").params.recruitmentid

  const { data, pending } = await useLazyAsyncData(
    "recruitment-applications",
    async () => {
      const list = await $fetch(`/api/recruitment/applications/list?id=${rId}`)
      if (!list) return []

      return list.map((ap, i) => ({
        ...ap,
        sn: i + 1,
        createdAt: useDateFormat(ap.createdAt, "MMMM DD, YYYY").value
      }))
    }
  )

  const columns = [
    {
      key: "sn",
      label: "ID"
    },
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
  const pageCount = ref(20)
  const q = ref("")
  
  const rows = computed(() => {
    let list: any = []
    if (q.value) {
      list = data.value!.filter((curr) => {
        return Object.values(curr).some((value) => {
          return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
      })
    }

    return list.length > 0
      ? list.slice(
          (page.value - 1) * pageCount.value,
          page.value * pageCount.value
        )
      : data.value
  })
</script>

<template>
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UiInput v-model="q" placeholder="Filter through the list..." />
  </div>
  <UiTable :loading="pending" :columns="columns" :rows="rows">
    <template #actions-data="{ row }">
      <div>
        <ui-button size="2xs" :to="`/admin/recruitment/${rId}/${row.id}`">
          Open
        </ui-button>
      </div>
    </template>
  </UiTable>
  <div w="full" flex="~ items-center justify-end" my="3">
    <UiPagination
      :max="5"
      v-model="page"
      :page-count="pageCount"
      :total="data?.length"
    />
  </div>
</template>

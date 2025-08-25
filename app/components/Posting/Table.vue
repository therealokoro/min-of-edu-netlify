<script setup lang="ts">
  const props = defineProps<{
    data: { [x: string]: any }[] | null
    loading: boolean
  }>()

  const renderList = computed(() => props.data ?? [])

  const columns = [
    {
      key: "sn",
      label: "ID"
    },
    {
      key: "staffName",
      label: "Staff Name"
    },
    {
      key: "type",
      label: "Type"
    },
    {
      key: "lga",
      label: "LGA"
    },
    {
      key: "createdAt",
      label: "Date Posted"
    },
    {
      key: "actions",
      label: "Actions"
    }
  ]
</script>

<template>
  <UiTable :columns="columns" :rows="renderList">
    <template #actions-data="{ row }">
      <div>
        <ui-button size="2xs" :to="`/admin/posting-transfer/${row.id}`">
          Open
        </ui-button>
      </div>
    </template>

    <!-- <template #type-data="{ row }">
      <UiBadge
        :color="getBadgeStyling(String(row.type).toLowerCase()).color"
        :label="getBadgeStyling(String(row.type).toLowerCase()).text"
        :ui="{ rounded: 'rounded-full' }"
        size="xs"
      />
    </template> -->
  </UiTable>
</template>

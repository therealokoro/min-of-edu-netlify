<script setup lang="ts">
  const columns = [
    {
      key: "sn",
      label: "S/N"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "role",
      label: "Role"
    },
    {
      key: "createdAt",
      label: "Date Registered"
    },
    {
      key: "actions",
      label: "Actions"
    }
  ]

  const props = defineProps<{
    data: { [x: string]: any }[] | null
    loading: boolean
  }>()

  const renderList = computed(() => props.data ?? [])
</script>

<template>
  <UiTable :columns="columns" :rows="renderList" :loading="loading">
    <template #actions-data="{ row }">
      <div>
        <ui-button
          size="xs"
          :to="`/admin/manage-staffs/${row.id}`"
          variant="ghost"
        >
          View
        </ui-button>
      </div>
    </template>
  </UiTable>
</template>

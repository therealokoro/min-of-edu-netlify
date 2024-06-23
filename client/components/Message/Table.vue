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
      key: "name",
      label: "Name"
    },
    {
      key: "email",
      label: "Email Address"
    },
    {
      key: "phoneNumber",
      label: "Phone Number"
    },
    {
      key: "createdAt",
      label: "Date"
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
        <ui-button size="2xs" :to="`/admin/messages/${row.id}`">
          Open
        </ui-button>
      </div>
    </template>
  </UiTable>
</template>

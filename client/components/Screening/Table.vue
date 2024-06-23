<script setup lang="ts">
  const props = defineProps<{
    data: { [x: string]: any }[] | null
    loading: boolean
    isStaff?: boolean
  }>()

  const renderList = computed(() => props.data ?? [])

  const columns = [
    {
      key: "sn",
      label: "ID"
    },
    {
      key: "title",
      label: "Verification Title"
    },
    {
      key: "createdAt",
      label: "Date Created"
    },
    {
      key: "deadline",
      label: "Deadline"
    },
    {
      label: "Status",
      key: "status"
    },
    {
      label: "Actions",
      key: "actions"
    }
  ]

  const staffPrefix = computed(() => (props.isStaff ? "staff" : "admin"))

  const resolveStatus = (date: string) => {
    return isDateExpired(date) ? "closed" : "inProgress"
  }
</script>

<template>
  <UiTable :columns="columns" :rows="renderList">
    <template #actions-data="{ row }">
      <div>
        <ui-button size="2xs" :to="`/${staffPrefix}/screening/${row.id}`">
          Open
        </ui-button>
      </div>
    </template>

    <template #status-data="{ row }">
      <UiBadge
        :color="getBadgeStyling(resolveStatus(row.deadline)).color"
        :label="getBadgeStyling(resolveStatus(row.deadline)).text"
        :ui="{ rounded: 'rounded-full' }"
        size="xs"
      />
    </template>
  </UiTable>
</template>

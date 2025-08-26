<script setup lang="ts">
  import { UiButton } from '#components'

  const columns= [
    {
      accessorKey: "sn",
      header: "S/N"
    },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "email",
      header: "Email"
    },
    {
      accessorKey: "role",
      header: "Role"
    },
    {
      accessorKey: "createdAt",
      header: "Date Registered"
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: any }) => {
        return h(
          UiButton,
          {
            color: 'neutral',
            variant: 'ghost',
            class: 'ml-auto',
            onClick: () => {
              navigateTo(`/admin/manage-staffs/${row.original.id}`)
            }
          },
          { default: () => "View" }
        )
      }
    }
  ]

  const props = defineProps<{
    data: Record<string, any>[] | null
    loading: boolean
  }>()

  const renderList = computed(() => props.data ?? [])
</script>

<template>
  <UiTable :columns="columns" :data="renderList" :loading="loading" />
</template>

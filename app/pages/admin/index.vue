<script lang="ts" setup>
  const todaysDate = computed(() => {
    return useDateFormat(useNow().value, "MMMM DD, YYYY").value
  })

  const user = computed(() => useAuth().user)
</script>

<template>
  <Page title="Admin Dashboard">
    <div space-y="1">
      <div flex="~ items-center gap-2">
        <h1 text="xl" font="bold">Welcome {{ user?.name }}</h1>
        <ui-badge label="Admin" color="success" />
      </div>

      <p text="sm accent" font="semibold">
        This is your dashboard, Today is {{ todaysDate }}
      </p>
    </div>
  </Page>
</template>

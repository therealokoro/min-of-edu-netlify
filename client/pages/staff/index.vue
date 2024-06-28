<script lang="ts" setup>
  const todaysDate = computed(() => {
    return useDateFormat(useNow().value, "MMMM DD, YYYY").value
  })

  const user = computed(() => useAuthStore().getAuthUser)
</script>

<template>
  <Page title="Staff Dashboard">
    <div space-y="1">
      <div flex="~ items-center gap-2">
        <h1 text="xl" font="bold">Welcome {{ useFullname(user) }}</h1>
        <ui-badge label="Staff" color="blue" />
      </div>
      
      <p text="sm accent" font="semibold">
        This is your dashboard, Today is {{ todaysDate }}
      </p>
    </div>
  </Page>
</template>

<script lang="ts" setup>
  const user = useAuth().user
  const userInfo = computed(() => {
    return {
      Fullname: user.name,
      "Email Address": user.email,
      "Phone Number": user.phoneNumber,
      "Date Registered": useDateFormat(user.createdAt, "MMMM DD, YYYY").value,
      Role: user.role
    }
  })
</script>

<template>
  <Page title="My Profile">
    <DashboardContentBlock heading="Basic Info">
      <div v-if="userInfo" w="full">
        <BaseDescriptionList double :data="userInfo" />
      </div>
    </DashboardContentBlock>
  </Page>
</template>

<script lang="ts" setup>
  import type { IPosting } from "~/types/posting.types"
  const currPosting = useState<any>("curr-posting", () => null)

  const user = useAuthStore().getAuthUser
  const userInfo = computed(() => {
    return {
      Surname: user.surname,
      Firstname: user.firstname,
      Lastname: user.lastname || "NOT_SET",
      "Email Address": user.email,
      "Phone Number": user.phoneNumber,
      "Date Registered": useDateFormat(user.createdAt, "MMMM DD, YYYY").value,
      Role: user.role
    }
  })

  const { data: postingInfo, pending } = await useAsyncData(async () => {
    const info = await $fetch<IPosting>(`/api/posting/${user.currentPostingId}`)
    currPosting.value = info

    if (!info) return null
    return {
      LGEA: info.lga,
      Position: info.position,
      ...(info.department && { Department: info.department }),
      ...(info.course && { Course: info.course }),
      institute: info.institute,
      Date: useDateFormat(info.createdAt, "MMMM DD, YYYY").value
    }
  })
</script>

<template>
  <Page title="My Profile">
    <DashboardContentBlock heading="Basic Info" :loading="pending">
      <div v-if="userInfo" w="full">
        <BaseDescriptionList double :data="userInfo" />
      </div>
    </DashboardContentBlock>

    <DashboardContentBlock heading="Current Posting Info" :loading="pending">
      <div v-if="postingInfo" w="full">
        <BaseDescriptionList double :data="postingInfo" />
      </div>
    </DashboardContentBlock>
  </Page>
</template>

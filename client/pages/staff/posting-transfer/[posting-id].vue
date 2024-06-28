<script lang="ts" setup>
  import type { IPosting } from "~/types/posting.types"
  const id = useRoute("staff-posting-transfer-postingid").params.postingid
  const currPosting = useState<any>("curr-posting", () => null)

  const { data: postingInfo, pending } = await useAsyncData(
    `posting-${id}`,
    async () => {
      const info = await $fetch<IPosting>(`/api/posting/${id}`)
      currPosting.value = info

      if (!info) return null
      return {
        "Staff Name": useFullname(info.staff),
        type: info.type,
        LGEA: info.lga,
        Position: info.position,
        ...(info.department && { Department: info.department }),
        ...(info.course && { Course: info.course }),
        institute: info.institute,
        "Date Created": useDateFormat(info.createdAt, "MMMM DD, YYYY").value
      }
    }
  )
</script>

<template>
  <Page title="Posting/Transfer">
    <DashboardContentBlock :loading="pending">
      <div v-if="postingInfo" w="full">
        <BaseDescriptionList double :data="postingInfo" />
      </div>
    </DashboardContentBlock>

    <DashboardContentBlock heading="Message">
      <p>{{ currPosting.message }}</p>
    </DashboardContentBlock>
  </Page>
</template>

<script lang="ts" setup>
  const createRecruitment = ref(false)
  const { RecruitmentInfo } = useFormSchemas()
  const $toast = usePush()
  const editorContent = ref('')

  const { 
    data: recruitmentList,
    refresh,
    pending
  } = useLazyAsyncData("staff-list", async () => {
    const list = await $fetch("/api/recruitment/list")
    return list.map((item: any, i: any) => ({
      ...item,
      sn: i + 1,
      createdAt: useDateFormat(item.createdAt, "MMMM DD, YYYY").value
    }))
  })

  async function handleCreateRecruitment(data: any) {
    const toast = $toast.promise("Creating new recruitment, please wait")

    try {
      await useFetch("/api/recruitment/create", {
        method: "POST",
        body: { ...data, description: editorContent.value }
      })

      toast.resolve({
        message: "New recruitment was created successfully",
        duration: 1000
      })

      refresh()
      createRecruitment.value = false
    } catch (e: any) {
      toast.reject({ message: e, duration: 1000 })
    }
  }
</script>

<template>
  <Page title="Recruitment">
    <div w="full">
      <ui-button size="sm" @click="createRecruitment = true">
        Create Recruitment
      </ui-button>
    </div>

    <DashboardContentBlock :loading="pending" heading="Job Listings">
      <div v-if="recruitmentList!.length < 1" w="full" flex="center" p="10">
        <p text="sm md:base" font="semibold">
          There are no job postings to display
        </p>
      </div>

      <div v-else w="full" grid="~ cols-1 md:cols-2 gap-5">
        <nuxt-link
          v-for="item in recruitmentList"
          :to="`/admin/recruitment/${item.id}`"
          bg="accent/4 hover:accent/10"
          flex="~ col gap-2"
          rounded="lg"
          bordered
          p="4"
        >
          <h3 text="base" font="bold">{{ item.jobTitle }}</h3>
          <p text="xs accent">Posted on {{ item.createdAt }}</p>
        </nuxt-link>
      </div>
    </DashboardContentBlock>

    <BaseDialog
      :ui="{ width: 'w-full lg:max-w-[70vw]' }"
      title="Create New Recruitment"
      v-model="createRecruitment"
    >
      <FormKit
        type="form"
        @submit="handleCreateRecruitment"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" grid="~ cols-1 lg:cols-2 gap-4">
          <div space-y="4">
            <FormKitSchema :schema="RecruitmentInfo" />
          </div>
          <div h="full">
            <BaseEditor v-model="editorContent" />
          </div>
        </div>
      </FormKit>
    </BaseDialog>
  </Page>
</template>

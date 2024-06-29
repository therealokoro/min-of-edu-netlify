<script lang="ts" setup>
  import type { IRecruitment } from "~/types/recruitment.types"
  const id = useRoute("admin-recruitment-recruitmentid").params.recruitmentid

  const $toast = usePush()
  const editRecruitment = ref(false)
  const deleteRecruitment = ref(false)
  const { RecruitmentInfo } = useFormSchemas()

  const { data, refresh } = useAsyncData("curr-recruitment", () => {
    return $fetch<IRecruitment | null>(`/api/recruitment/${id}`)
  })

  const currRecruitment = computed<any>(() => {
    return data.value
      ? { ...data.value, deadline: String(data.value.deadline) }
      : null
  })

  const snInfo = computed(() => {
    if (!data.value) return {}
    return {
      jobTitle: data.value.jobTitle,
      "Created At": useDateFormat(data.value.createdAt, "MMMM DD, YYYY").value,
      deadline: useDateFormat(data.value.deadline, "MMMM DD, YYYY").value,
      requirements: data.value.requirements.split("|"),
      status: isDateExpired(data.value.deadline) ? "closed" : "inProgress"
    }
  })

  const editorContent = ref("")
  async function handleEditRecruitment(data: any) {
    const toast = $toast.promise("Updating recruitment info, please wait")
    try {
      await $fetch(`/api/recruitment/${id}`, {
        method: "PUT",
        body: { ...data, description: editorContent.value }
      })
      toast.resolve("Recruitment updated successfully")
      refresh()
      editRecruitment.value = false
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  async function handleDeleteRecruitment() {
    const toast = $toast.promise("Deleting recruitment info, please wait")
    try {
      await $fetch(`/api/recruitment/${id}`, { method: "DELETE" })
      toast.resolve("Recruitment was deleted successfully")
      navigateTo("/admin/recruitment")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Recruitment Info" spacing="space-y-7">
    <div w="full" space-x="3">
      <ui-button size="sm" @click="editRecruitment = true">
        Edit Recruitment
      </ui-button>
      <ui-button size="sm" color="red" @click="deleteRecruitment = true">
        Delete Recruitment
      </ui-button>
    </div>

    <DashboardContentBlock>
      <dl divide="y gray-100">
        <div
          v-for="(value, label) in snInfo"
          p="3"
          grid="~ cols-3 gap-4"
          capitalize
        >
          <dt text="sm accent" font="bold" leading="6">
            {{ label }}
          </dt>
          <dd text="sm" font="medium" leading="6" col="span-2">
            <UiBadge
              v-if="label == 'status'"
              :color="getBadgeStyling(String(snInfo.status)).color"
              :label="getBadgeStyling(String(snInfo.status)).text"
              :ui="{ rounded: 'rounded-full' }"
              size="xs"
            />
            <div v-else-if="label == 'requirements'" space-x="2">
              <UiBadge
                v-for="item in value"
                :label="item"
                :ui="{ rounded: 'rounded-md' }"
                size="xs"
              />
            </div>
            <span v-else>{{ value }}</span>
          </dd>
        </div>
      </dl>
    </DashboardContentBlock>

    <DashboardContentBlock>
      <div
        w="70vw"
        mx-auto
        text="justify"
        class="wysiwyq"
        v-html="currRecruitment?.description"
      />
    </DashboardContentBlock>

    <DashboardContentBlock>
      <LazyRecruitmentApplications />
    </DashboardContentBlock>

    <BaseDialog
      :ui="{ width: 'w-full lg:max-w-[70vw]' }"
      title="Edit Recruitment"
      v-model="editRecruitment"
    >
      <FormKit
        type="form"
        :value="currRecruitment!"
        @submit="handleEditRecruitment"
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

    <LazyBaseConfirmDialog
      v-model="deleteRecruitment"
      message="Are you sure you want to delete this recruitment?"
      @confirm="handleDeleteRecruitment"
    />
  </Page>
</template>

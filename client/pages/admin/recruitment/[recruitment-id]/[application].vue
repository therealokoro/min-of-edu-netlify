<script lang="ts" setup>
  import type { IUploadedFile } from "~/types/file.type"
  import type { IApplication } from "~/types/recruitment.types"
  const appId = useRoute("admin-recruitment-recruitmentid-application").params
    .application
  const uploadedFiles = useState<IUploadedFile[]>(() => [])

  const pageTitle = computed(() => {
    return application.value ? `${application.value.name}'s Application` : ""
  })
  const $toast = usePush()

  const {
    data: application,
    pending,
    refresh
  } = useAsyncData(`application-${appId}`, () => {
    return $fetch<IApplication | null>(`/api/recruitment/applications/${appId}`)
  })

  const appInfo = computed(() => {
    if (!application.value) return null
    application.value = application.value
    uploadedFiles.value = application.value.uploadedFiles.map((curr: any) => ({
      ...curr,
      name: curr.requirement
    }))

    return {
      "Job Title": application.value.recruitment?.jobTitle,
      "Applicant Name": application.value.name,
      "Email Address": application.value.email,
      "Phone Number": application.value.phoneNumber,
      "Application Date": useDateFormat(
        application.value.createdAt,
        "MMMM DD, YYYY"
      ).value,
      status: application.value.status
    }
  })

  const responseModal = ref(false)
  const responseList = ["approved", "pending", "declined"]
  const response = ref(application.value?.status)

  const getResponseConfig = (status: string) => {
    const config: Record<string, string> = {
      approved: "bg-green-100 c-green",
      pending: "bg-orange-100 c-orange",
      declined: "bg-red-100 c-red"
    }

    return response.value == status
      ? config[status]
      : "bg:(base-100 hover:accent/10) text-content-100"
  }

  async function handleResponse(data: any) {
    const toast = $toast.promise("Sending response, please wait")
    try {
      await $fetch("/api/recruitment/applications/" + appId, {
        method: "PUT",
        body: { ...application.value, ...data }
      })
      toast.resolve("Response was sent successfully")
      responseModal.value = false
      refresh()
    } catch (e: any) {
      toast.reject(e.application.message)
    }
  }
</script>

<template>
  <Page :title="pageTitle">
    <DashboardContentBlock :loading="pending">
      <div v-if="appInfo" w="full">
        <BaseDescriptionList double :data="appInfo" />
      </div>
    </DashboardContentBlock>

    <DashboardContentBlock heading="Uploaded Requirements">
      <BaseFileViewer :files="uploadedFiles" />

      <div w="full" flex="center" mt="7">
        <ui-button @click="responseModal = true">Send Response</ui-button>
      </div>
    </DashboardContentBlock>

    <BaseDialog v-model="responseModal" title="Send Response">
      <div w="full" space-y="5" flex="center col">
        <p text="sm" font="semibold">
          Select a response type for this application
        </p>

        <div w="auto" space-x="1">
          <button
            v-for="item in responseList"
            p="2"
            rounded="lg"
            text="sm"
            capitalize
            font="semibold"
            @click="response = item"
            :class="getResponseConfig(item)"
          >
            {{ item }}
          </button>
        </div>

        <FormKit
          type="form"
          :classes="{ form: 'w-full' }"
          @submit="handleResponse"
          :submit-attrs="{ inputClass: 'w-full !h-10 accent-button' }"
        >
          <FormKit type="hidden" name="status" v-model="response" />

          <!-- <FormKit
            v-if="response !== 'pending'"
            :classes="{ input: 'h-100px', label: 'text-center' }"
            type="textarea"
            name="message"
            label="Response Message"
            placeholder="Enter a response message to be sent"
            validation="required"
          /> -->
        </FormKit>
      </div>
    </BaseDialog>
  </Page>
</template>

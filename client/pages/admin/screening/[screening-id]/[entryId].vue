<script lang="ts" setup>
  import type { IUploadedFile } from "~/types/file.type"
  import type { IScreeningEntry } from "~/types/screening.types"
  const id = useRoute("admin-screening-screeningid-entryId").params.entryId
  const screeningStatusModal = ref(false)
  const $toast = usePush()

  const screeningStatusList = ["approved", "pending", "queried"]
  const screeningStatus = ref("pending")
  const entryFiles = useState<IUploadedFile[]>(() => [])

  const {
    data: entry,
    error,
    refresh,
    pending
  } = await useAsyncData(`entry-${id}`, async () => {
    const entry = await $fetch<IScreeningEntry | null>(
      `/api/screening/entry/${id}`
    )
    const list = (entry?.uploadedFiles as unknown as any[]) || []
    entryFiles.value = list.map((curr) => ({ ...curr, name: curr.requirement }))
    return entry
  })

  const pageTitle = computed(() => {
    return entry.value
      ? useFullname(entry.value.staff) + " Verification"
      : "Recruitment"
  })

  function setScreeningStatus(status: string) {
    screeningStatus.value = status
  }

  const getStatusConfig = (status: string) => {
    const statusConfig: Record<string, string> = {
      approved: "bg-green-100 c-green",
      pending: "bg-orange-100 c-orange",
      queried: "bg-red-100 c-red"
    }

    return screeningStatus.value == status
      ? statusConfig[status]
      : "bg:(base-100 hover:accent/10) text-content-100"
  }

  async function handleUpdateScreening(data: any) {
    const toast = $toast.promise("Setting verification status, please wait")
    try {
      await $fetch(`/api/screening/entry/${id}`, {
        method: "PUT",
        body: { ...data }
      })
      toast.resolve("Entry status updated successfully")
      refresh()
      screeningStatusModal.value = false
    } catch (e: any) {
      toast.reject("e.data.message")
    }
  }
</script>

<template>
  <Page :title="pageTitle" :error="error">
    <div flex="~ items-center gap-2">
      <h1 text="xl" font="bold">
        {{ useFullname(entry!.staff) }} Uploaded Verification Files
      </h1>
      <UiBadge
        :color="getBadgeStyling(entry!.status || 'pending').color"
        :label="getBadgeStyling(entry!.status || 'pending').text"
        :ui="{ rounded: 'rounded-full' }"
      />
    </div>

    <DashboardContentBlock v-if="entry?.message" heading="Response Message">
      <p>{{ entry.message }}</p>
    </DashboardContentBlock>

    <DashboardContentBlock :loading="pending">
      <BaseFileViewer :files="entryFiles" />

      <div w="full" flex="center" mt="7">
        <ui-button @click="screeningStatusModal = true"> Set Status </ui-button>
      </div>
    </DashboardContentBlock>

    <BaseDialog v-model="screeningStatusModal" title="Set Verification Status">
      <div w="full" space-y="5" flex="center col">
        <p text="sm" font="semibold">
          Select a verification status for current staff
        </p>

        <div w="auto" space-x="1">
          <button
            v-for="item in screeningStatusList"
            p="2"
            rounded="lg"
            text="sm"
            capitalize
            font="semibold"
            @click="setScreeningStatus(item)"
            :class="getStatusConfig(item)"
          >
            {{ item }}
          </button>
        </div>

        <FormKit
          type="form"
          :classes="{ form: 'w-full' }"
          @submit="handleUpdateScreening"
          :submit-attrs="{ inputClass: 'w-full !h-10 accent-button' }"
        >
          <FormKit type="hidden" name="status" v-model="screeningStatus" />

          <FormKit
            v-if="screeningStatus !== 'pending'"
            :classes="{ input: 'h-100px', label: 'text-center' }"
            type="textarea"
            name="message"
            label="Response Message"
            placeholder="Enter a message to be sent"
            validation="required"
          />
        </FormKit>
      </div>
    </BaseDialog>
  </Page>
</template>

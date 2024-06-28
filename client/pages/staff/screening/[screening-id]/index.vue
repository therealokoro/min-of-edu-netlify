<script lang="ts" setup>
  import type { IScreening, IScreeningEntry } from "~/types/screening.types"
  const snId = useRoute("admin-screening-screeningid").params.screeningid

  const $toast = usePush()
  const uploadFileModal = ref(false)
  const staff = useAuthStore().getAuthUser
  const currScreening = ref<any>(null)
  const entry = ref<IScreeningEntry | null>(null)

  // fetch data
  const { data: snInfo } = await useAsyncData("curr-screening", async () => {
    const sn = await $fetch<IScreening | null>(`/api/screening/${snId}`)

    if (!sn) return null
    const staffEntry =
      sn.entries.find((curr) => curr.staffId == staff.id) || null
    entry.value = staffEntry

    currScreening.value = {
      ...sn,
      deadline: String(sn!.deadline),
      requirements: sn!.requirements.split("|")
    }

    return {
      title: sn.title,
      description: sn.description,
      "Created At": useDateFormat(sn.createdAt, "MMMM DD, YYYY").value,
      deadline: useDateFormat(sn.deadline, "MMMM DD, YYYY").value,
      requirements: sn!.requirements.split("|"),
      "Verification Status": isDateExpired(sn.deadline)
        ? "closed"
        : "inProgress",
      ...(staffEntry && { "Response Status": staffEntry?.status || "pending" })
    }
  })

  const requirementOpts = computed(() => {
    if (!snInfo.value) return []
    return snInfo.value.requirements.map((curr: string) => ({
      name: useSlugify(curr),
      label: `Upload ${curr}`
    })) as { name: string; label: string }[]
  })

  // populate selected files from db
  const uploadedFiles = computed(() => {
    return entry.value ? entry.value.uploadedFiles : []
  })

  // upload files
  async function handleUploadFiles(data: any) {
    const toast = $toast.promise(
      "Uploading your verification files, please wait"
    )
    try {
      // append files and other informations to a formdata
      const fd = new FormData()
      fd.append("staffId", useAuthStore().getAuthUser.id)
      fd.append("screeningId", snId)

      for (const [key, val] of Object.entries(data)) {
        fd.append(key, val as any)
      }

      // send files to server
      const res = await $fetch("/api/screening/upload", {
        method: "POST",
        body: fd
      })
      entry.value = res as any

      toast.resolve("Verification files uploaded successfully")
      uploadFileModal.value = false
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  const alertConfig = computed(() => {
    if (!entry.value) return {}
    const status = entry.value.status

    if (status == "approved") {
      return {
        title: "Approved",
        color: "green",
        message: entry.value.message
      }
    } else if (status == "queried") {
      return {
        title: "queried",
        color: "red",
        message: entry.value.message
      }
    } else {
      return {
        title: "Pending",
        color: "orange",
        message:
          "You have successfully submitted your files for screening. A response will be sent to you soonest"
      }
    }
  })
</script>

<template>
  <Page title="Screening Info" spacing="space-y-7">
    <ClientOnly>
      <UiAlert
        v-if="entry"
        icon="i-tabler-info-circle"
        :title="alertConfig.title!"
        :color="alertConfig.color!"
        variant="solid"
        :description="alertConfig.message!"
      />
    </ClientOnly>

    <DashboardContentBlock>
      <div divide="y gray-100">
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
              v-if="label == 'Verification Status'"
              :color="getBadgeStyling(snInfo!['Verification Status']).color"
              :label="getBadgeStyling(snInfo!['Verification Status']).text"
              :ui="{ rounded: 'rounded-full' }"
              size="xs"
            />
            <UiBadge
              v-else-if="label == 'Response Status'"
              :color="getBadgeStyling(snInfo!['Response Status']!).color"
              :label="getBadgeStyling(snInfo!['Response Status']!).text"
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
      </div>
    </DashboardContentBlock>

    <DashboardContentBlock v-if="entry?.message" heading="Response Message">
      <p>{{ entry.message }}</p>
    </DashboardContentBlock>

    <DashboardContentBlock heading="Upload Files">
      <ClientOnly>
        <div w="full" grid="~ cols-2 md:cols-3 lg:cols-4 gap-7">
          <button
            flex="center col gap-4"
            bordered
            rounded="lg"
            bg="base-300"
            p="y10"
            col-span="1"
            @click="uploadFileModal = true"
          >
            <div text="xl" class="i-tabler-cloud-upload" />
            <span text="sm" font="bold">Upload a File</span>
          </button>
          <!-- show all uploaded files -->
          <nuxt-link
            flex="center col gap-4"
            bordered
            rounded="lg"
            p="y10"
            v-for="item in uploadedFiles"
            relative
            :to="item.url"
            target="__blank"
          >
            <div class="i-mingcute-pdf-line" text="3xl" />
            <div space-y="1">
              <p text="xs" font="bold">{{ item.name }}</p>
            </div>
          </nuxt-link>
        </div>
      </ClientOnly>
    </DashboardContentBlock>

    <BaseDialog
      :ui="{ width: 'w-full lg:max-w-[50vw]' }"
      title="Upload Requirements"
      v-model="uploadFileModal"
    >
      <FormKit
        type="form"
        @submit="handleUploadFiles"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" space-y="5">
          <FormKit
            v-for="item in requirementOpts"
            type="upload"
            validation="required"
            :name="item.name"
            accepts="pdf|jpg|jpeg"
            size="1000000"
            :label="item.label"
            help="File size must not be more than 1mb"
          />
        </div>
      </FormKit>
    </BaseDialog>
  </Page>
</template>

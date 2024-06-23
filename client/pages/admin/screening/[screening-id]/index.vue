<script lang="ts" setup>
  import type { IScreening } from "~/types/screening.types"
  const id = useRoute("admin-screening-screeningid").params.screeningid

  const $toast = usePush()
  const editScreening = ref(false)
  const deleteScreening = ref(false)
  const { ScreeningInfo } = useFormSchemas()
  const currScreening = useState<any>("screening", () => null)

  const entries = computed(() => {
    if (!currScreening.value) return []
    return currScreening.value.entries.map((curr: any) => ({
      ...curr,
      link: `/admin/screening/${id}/${curr.id}`,
      staffName: useFullname(curr.staff)
    }))
  })

  const { data: snInfo, refresh } = await useAsyncData(
    "curr-screening",
    async () => {
      const sn = await $fetch<IScreening | null>(`/api/screening/${id}`)

      currScreening.value = {
        ...sn,
        deadline: String(sn!.deadline),
        requirements: sn!.requirements.split("|")
      }

      if (!sn) return null

      return {
        title: sn.title,
        description: sn.description,
        "Created At": useDateFormat(sn.createdAt, "MMMM DD, YYYY").value,
        deadline: useDateFormat(sn.deadline, "MMMM DD, YYYY").value,
        requirements: sn!.requirements.split("|"),
        status: isDateExpired(sn.deadline) ? "closed" : "inProgress"
      }
    }
  )

  async function handleEditScreening(data: any) {
    const toast = $toast.promise("Updating screening info, please wait")
    try {
      await $fetch(`/api/screening/${id}`, { method: "PUT", body: data })
      toast.resolve("Verification updated successfully")
      refresh()
      editScreening.value = false
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  async function handleDeleteScreening() {
    const toast = $toast.promise("Deleting screening info, please wait")
    try {
      await $fetch(`/api/screening/${id}`, { method: "DELETE" })
      toast.resolve("Verification was deleted successfully")
      navigateTo("/admin/screening")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Screening Info" spacing="space-y-7">
    <div w="full" space-x="3">
      <ui-button size="sm" @click="editScreening = true">
        Edit Verification
      </ui-button>
      <ui-button size="sm" color="red" @click="deleteScreening = true">
        Delete Verification
      </ui-button>
    </div>

    <div bg="base-200" p="3" rounded="lg">
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
              :color="getBadgeStyling(snInfo!.status).color"
              :label="getBadgeStyling(snInfo!.status).text"
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
    </div>

    <DashboardContentBlock heading="Uploaded Screening Files">
      <div v-if="!entries.length" flex="center">
        <p text="sm content-100" font="bold">
          There are no entries to display yet
        </p>
      </div>

      <div v-else grid="~ cols-1 md:cols-2 gap-5">
        <nuxt-link
          bg="base-300 hover:accent/10"
          p="5"
          bordered
          rounded="lg"
          space-y="2"
          v-for="item in entries"
          :to="item.link"
        >
          <div flex="~ items-center gap-2">
            <p text="sm" font="semibold">{{ item.staffName }}</p>
            <UiBadge
              size="xs"
              variant="soft"
              :color="getBadgeStyling(item.status).color"
              :label="getBadgeStyling(item.status).text"
            />
          </div>
          <p text="xs content-100" font="semibold">
            Click to view uploaeded files
          </p>
        </nuxt-link>
      </div>
    </DashboardContentBlock>

    <BaseDialog title="Edit Verification" v-model="editScreening">
      <FormKit
        type="form"
        :value="currScreening!"
        @submit="handleEditScreening"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" grid="~ cols-1 md:cols-2 gap-4">
          <FormKitSchema :schema="ScreeningInfo" />
        </div>
      </FormKit>
    </BaseDialog>

    <LazyBaseConfirmDialog
      v-model="deleteScreening"
      message="Are you sure you want to delete this verification?"
      @confirm="handleDeleteScreening"
    />
  </Page>
</template>

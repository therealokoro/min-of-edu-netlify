<script lang="ts" setup>
  import type { IUser } from "~/types/auth.types"

  const { PostingSchema } = useFormSchemas()
  const $staff = useStaffStore()
  const $toast = usePush()
  const currAction = ref("")

  const { data: staffList } = useAsyncData(async () => {
    return (await $staff.fetchStaffList()) as IUser[]
  })

  const staffListOptions = computed(() => {
    let list: IUser[] = []
    const sl = staffList.value || []

    if (currAction.value == "Posting") {
      list = useArrayFilter(sl, (d) => d.currentPostingId == null).value
    } else if (currAction.value == "Transfer") {
      list = useArrayFilter(sl, (d) => d.currentPostingId !== null).value
    }

    return list.map((staff) => ({
      value: staff.id,
      label: useFullname(staff)
    }))
  })

  async function handlePostingAndTransfer(data: any) {
    const text = currAction.value == "posting" ? "posted" : "transfered"
    const toast = $toast.promise("Processing your request, please wait")
    try {
      await $fetch("/api/posting/create", {
        method: "POST",
        body: { ...data, type: currAction.value }
      })
      toast.resolve(`Staff has been ${text} successfully`)
      navigateTo("/admin/posting-transfer")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Post/Transfer a Staff">
    <DashboardContentBlock>
      <div w="full" flex="col center gap-2">
        <h3 text="sm" font="semibold">Select an action</h3>
        <div space-x="2">
          <ui-button
            v-for="item in ['Posting', 'Transfer']"
            @click="currAction = item"
            :variant="currAction == item ? 'solid' : 'outline'"
          >
            {{ item }}
          </ui-button>
        </div>
      </div>

      <div v-if="currAction != ''" w="full">
        <FormKit
          type="form"
          @submit="handlePostingAndTransfer"
          :submit-attrs="{ inputClass: '!h-10 accent-button' }"
        >
          <div w="full" grid="~ cols-1 md:cols-2 gap-5" my="5">
            <FormKitSchema :schema="PostingSchema(staffListOptions)" />
          </div>
          <FormKit
            type="textarea"
            name="message"
            label="Message"
            placeholder="Enter a message to be sent"
            validation="required"
          />
        </FormKit>
      </div>
    </DashboardContentBlock>
  </Page>
</template>

<script lang="ts" setup>
  const postingId = useRoute("admin-posting-transfer-edit-id").params.id
  const { PostingSchema } = useFormSchemas()
  const $toast = usePush()

  const { data: postingInfo } = await useFetch<IPosting>(
    "/api/posting/" + postingId
  )

  const currAction = ref("")

  async function handlePostingAndTransfer(data: any) {
    console.log(data)
    const toast = $toast.promise("Processing your request, please wait")
    try {
      await $fetch("/api/posting/" + postingId, {
        method: "PUT",
        body: { ...data, type: currAction.value }
      })
      toast.resolve(`Posting info has been updated successfully`)
      navigateTo("/admin/posting-transfer/" + postingId)
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Edit Posting/Transfer">
    <DashboardContentBlock>
      <div w="full" flex="col center gap-4">
        <h1 text="xl" font="bold">
          Edit Posting/Transfer for
          <span c="accent">{{ useFullname(postingInfo!.staff) }}</span>
        </h1>
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

      <div v-if="currAction != '' && postingInfo" w="full">
        <FormKit
          type="form"
          :value="postingInfo || {}"
          @submit="handlePostingAndTransfer"
          :submit-attrs="{ inputClass: '!h-10 accent-button' }"
        >
          <div w="full" grid="~ cols-1 md:cols-2 gap-5" my="5">
            <FormKit
              type="text"
              disabled
              label="Staff"
              :value="useFullname(postingInfo.staff)"
            />
            <FormKitSchema :schema="PostingSchema()" />
            <FormKit
              type="hidden"
              :value="postingInfo.staffId"
              name="staffId"
            />
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

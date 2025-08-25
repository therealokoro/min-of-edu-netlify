<script lang="ts" setup>
  const messageId = useRoute("admin-messages-messageId").params.messageId
  const $toast = usePush()
  const deleteReplyModal = ref(false)
  const replyModal = ref(false)

  const {
    data: messageInfo,
    refresh,
    pending,
    error
  } = await useAsyncData(`message-${messageId}`, async () => {
    const info = await $fetch<IMessage>(`/api/message/${messageId}`)
    if (!info) return null

    return {
      meta: {
        Name: info.name,
        "Email Address": info.email,
        "Phone Number": info.phoneNumber,
        "Date Created": useDateFormat(info.createdAt, "MMMM DD, YYYY").value
      },
      body: info.body,
      reply: info.reply
    }
  })

  async function handleSubmitReply(data: any) {
    const toast = $toast.promise("Sending your reply, please wait")
    try {
      await $fetch(`/api/message/${messageId}`, { method: "PUT", body: data })
      toast.resolve("Your reply was sent successfully")
      replyModal.value = false
      refresh()
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  async function handleDeleteMessage() {
    const toast = $toast.promise("Deleting message, please wait")
    try {
      await $fetch(`/api/message/${messageId}`, { method: "DELETE" })
      toast.resolve("Message was deleted successfully")
      navigateTo("/admin/messages")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Messages" :error="error">
    <div w="full" flex="~ gap-2">
      <ui-button @click="replyModal = true" size="sm">
        Reply Message
      </ui-button>
      <ui-button color="red" @click="deleteReplyModal = true" size="sm">
        Delete Message
      </ui-button>
    </div>

    <DashboardContentBlock :loading="pending">
      <div w="full">
        <BaseDescriptionList double :data="messageInfo!.meta" />
      </div>
    </DashboardContentBlock>

    <div grid="~ cols-1 md:cols-2 gap-5">
      <DashboardContentBlock heading="Message">
        <p>{{ messageInfo!.body }}</p>
      </DashboardContentBlock>

      <DashboardContentBlock heading="Reply">
        <p v-if="messageInfo!.reply">{{ messageInfo!.reply }}</p>
        <p v-else text="center sm content-100" font="bold">
          You have not replied to this message yet
        </p>
      </DashboardContentBlock>
    </div>

    <BaseDialog
      :ui="{ width: 'w-full lg:max-w-[50vw]' }"
      title="Send a Reply"
      v-model="replyModal"
    >
      <FormKit
        type="form"
        @submit="handleSubmitReply"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <FormKit
          :classes="{ input: 'h-100px', label: 'text-center' }"
          type="textarea"
          name="reply"
          label="Response Message"
          placeholder="Enter a message to be sent"
          validation="required"
        />
      </FormKit>
    </BaseDialog>

    <LazyBaseConfirmDialog
      v-model="deleteReplyModal"
      message="Are you sure you want to delete this message?"
      @confirm="handleDeleteMessage"
    />
  </Page>
</template>

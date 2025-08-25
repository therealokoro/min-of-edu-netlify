<script lang="ts" setup>
  const props = defineProps<{ messages: IFeedback[] }>()
  const $auth = useAuth()

  const renderList = computed(() => {
    const userRole = $auth.user.role

    return props.messages.map((curr) => ({
      senderName:
        userRole == "Admin" ? useFullname(curr.admin) : useFullname(curr.staff),
      lastMsg: {
        body: curr.messages[0]?.body,
        date: curr.messages[0]?.createdAt
      },
      ...curr
    }))
  })
</script>

<template>
  <Page title="Staff Enquires">
    <div w="full" grid="~ cols-1 md:cols-2 gap-4">
      <DashboardContentBlock heading="Messages">
        <div
          v-if="messages.length"
          w="full"
          space-y="3"
          overflow="x-hidden y-auto"
          max-h="65vh"
        >
          <button
            v-for="item in renderList"
            border-b="1"
            p="5"
            bg="base-300"
            rounded="md"
          >
            <div w="full" flex="~ items-center justify-between">
              <h3 text="sm" font="bold">{{ item.senderName }}</h3>
              <span text="xs accent/40" font="bold">{{
                item.lastMsg.date
              }}</span>
            </div>
            <div text="sm" w="full" line-clamp="2">
              {{ item.lastMsg.body }}
            </div>
          </button>
        </div>

        <div v-else flex="center">
          <p text="sm content-100" font="bold">
            There are no messages to preview
          </p>
        </div>
      </DashboardContentBlock>

      <!-- Preview -->
      <DashboardContentBlock heading="Preview">
        <div w="full" max-h="65vh" overflow="x-hidden y-auto">
          <div flex="center">
            <p text="sm content-100" font="bold">
              Please select a message to preview
            </p>
          </div>
        </div>
      </DashboardContentBlock>
    </div>
  </Page>
</template>

<script lang="ts" setup>
  import { reset } from "@formkit/vue"

  const { data: c, refresh } = await useFetch("/api/content/get")

  const $toast = usePush()
  const currAction = ref("")
  const addressModal = ref(false)
  const upsertModal = ref(false)
  const deleteModal = ref(false)
  const activeSlide = ref<IHeroSlide | null>(null)
  const slides = computed(() => (c.value?.heroSlider as IHeroSlide[]) || [])
  const welcomeAddress = computed(() => c.value?.welcomeAddress as IWelcomeAddress)
  const uiMsg = computed(() => {
    return currAction.value == "edit" ? "Edit" : "Add New"
  })

  function sendAction(profile: any, action: "delete" | "edit") {
    currAction.value = action
    activeSlide.value = profile

    if (action == "delete") deleteModal.value = true
    else if (action == "edit") {
      upsertModal.value = true
    }
  }

  const slideKeys = ["slider-1", "slider-2", "slider-3", "slider-4", "slider-5"]

  async function handleWelcomeAddress(data: any) {
    const toast = $toast.promise(`Updating welcome address, please wait`)

    try {
      const fd = new FormData()
      fd.append("body", data.body)
      fd.append("name", data.name)
      fd.append("file", data.file)
      fd.append("position", data.position)

      await $fetch("/api/content/address", {
        method: "PUT",
        body: fd
      })
      toast.resolve(`Successfully updated welcome address`)
      reset("form-2")
      addressModal.value = false
      await refresh()
    } catch (e: any) {
      toast.reject(e.data?.message || e.message)
    }
  }

  async function handleMutateSlides(data: any) {
    const toast = $toast.promise(`Prcoessing your action, please wait`)

    try {
      const fd = new FormData()
      fd.append("action", data.action)
      fd.append("key", data.key)
      fd.append("name", data.name)
      fd.append("file", data.file)
      fd.append("position", data.position)

      await $fetch("/api/content/hero-slider/mutate", {
        method: "POST",
        body: fd
      })
      toast.resolve(`Successfully made changes to the slide`)
      reset("form")
      upsertModal.value = false
      await refresh()
    } catch (e: any) {
      toast.reject(e.data?.message || e.message)
    }
  }

  async function handleDeleteSlides() {
    const toast = $toast.promise(`Deleting slide, please wait`)
    await $fetch(
      `/api/content/hero-slider/delete?key=${activeSlide.value?.key}`,
      {
        method: "DELETE"
      }
    )
    try {
      await refresh()
    } catch (e: any) {
      toast.reject(e.data?.message || e.message)
    }
  }

  function resetAll() {
    currAction.value = "add"
    activeSlide.value = null
    reset("form")
  }

  function initAddSlider() {
    resetAll()
    upsertModal.value = true
  }
</script>

<template>
  <Page title="Homepage - Manage Pages">
    <!-- Hero Slider -->
    <DashboardContentBlock
      heading="Homepage Slider"
      description="You can upload a total of 5 slides"
    >
      <template #extra>
        <ui-button
          :disabled="slides?.length == 5"
          @click="initAddSlider"
          label="Add Slider"
        />
      </template>

      <div v-if="!slides?.length" w="full" flex="center">
        <p text="sm" font="bold">You have not added any slide yet</p>
      </div>

      <div v-else w="full" grid="~ cols-1 md:cols-2 gap-5">
        <div v-for="item in slides" flex="~ items-center gap-5">
          <div w="70px" h="70px" border relative>
            <img :src="item.imgUrl" size="full" object="cover" />
          </div>
          <div>
            <div w="full" flex="~ col gap-1">
              <h3 line-clamp="1" text="sm" font="bold">{{ item.name }}</h3>
              <p text="xs content-100">{{ item.position }}</p>
            </div>
            <div w="full" flex="~ gap-1" mt="2">
              <ui-button
                @click="sendAction(item, 'edit')"
                variant="soft"
                size="xs"
              >
                Edit
              </ui-button>
              <ui-button
                @click="sendAction(item, 'delete')"
                variant="soft"
                size="xs"
                color="error"
              >
                Delete
              </ui-button>
            </div>
          </div>
        </div>
      </div>
    </DashboardContentBlock>

    <DashboardContentBlock
      heading="Welcome Address"
      description="Edit the comissioner's welcome address"
    >
      <template #extra>
        <ui-button @click="addressModal = true" label="Edit Message" />
      </template>

      <div v-if="welcomeAddress"  w="full" grid="~ cols-1 md:cols-5 gap-2">
        <div col-span="2" flex="~ col center gap-2">
          <div aspect="square" size="200px" border relative>
            <img :src="welcomeAddress.imgUrl" size="full" object="cover" />
          </div>

          <div space-y="1" text="center">
            <h3 text="sm" font="bold">{{ welcomeAddress.name }}</h3>
            <p text="xs content-200" font="semibold">{{ welcomeAddress.position }}</p>
          </div>
        </div>

        <div col-span="3" overflow="auto" bordered p="5">
          <p>{{ welcomeAddress.body }}</p>
        </div>
      </div>
    </DashboardContentBlock>

    <BaseDialog
      :title="`${uiMsg} Slide`"
      v-model="upsertModal"
      @close="resetAll"
    >
      <FormKit
        type="form"
        id="form"
        :value="activeSlide || {}"
        @submit="handleMutateSlides"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" space-y="5">
          <FormKit
            type="select"
            name="key"
            label="Slide Position"
            placeholder="Select the position of the slide"
            :options="slideKeys"
            validation="required"
          />
          <FormKit
            type="text"
            name="name"
            label="Staff Name"
            placeholder="Enter the staff name here"
            validation="required"
          />
          <FormKit
            type="text"
            name="position"
            label="Staff Position"
            placeholder="Enter the staff position here"
            validation="required"
          />
          <FormKit
            type="upload"
            name="file"
            label="Staff Image"
            placeholder="Select a picture for the staff"
            accepts="jpg|png|jpeg"
            size="1000000"
          />
          <FormKit type="hidden" name="action" :value="currAction" />
        </div>
      </FormKit>
    </BaseDialog>

    <BaseDialog title="Edit Comissioner's Address" v-model="addressModal">
      <FormKit
        type="form"
        id="form-2"
        :value="welcomeAddress || {}"
        @submit="handleWelcomeAddress"
        :submit-attrs="{ inputClass: '!h-10 accent-button' }"
      >
        <div w="full" space-y="5">
          <FormKit
            type="text"
            name="name"
            label="Comissioner's Name"
            placeholder="Enter the commissioner's name here"
            validation="required"
          />
          <FormKit
            type="text"
            name="position"
            label="Title/Position"
            placeholder="Enter the comissioner's position here"
            validation="required"
          />
          <FormKit
            type="textarea"
            name="body"
            label="Message"
            placeholder="Enter the comissioner's message here"
            validation="required"
          />
          <FormKit
            type="upload"
            name="file"
            label="Comissioner's Image"
            placeholder="Select a picture for the comissioner"
            accepts="jpg|png|jpeg"
            size="1000000"
          />
        </div>
      </FormKit>
    </BaseDialog>

    <LazyBaseConfirmDialog
      v-model="deleteModal"
      title="Confirm Delete"
      message="Are you sure you want to delete this slide?"
      @confirm="handleDeleteSlides"
      @close="resetAll"
    />
  </Page>
</template>

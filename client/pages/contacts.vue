<script lang="ts" setup>
  const description = ref(
    "Need to tell us something, may be report an issue, request a feature or general feedbacks, please live us a message, we would love to hear from you."
  )

  useSeoMeta({
    description,
    ogDescription: description
  })

  const $toast = usePush()

  const formSchema = [
    {
      $formkit: "text",
      label: "Name",
      name: "name",
      validation: "required",
      placeholder: "Enter your name here"
    },
    {
      $formkit: "tel",
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Enter your phone number here",
      help: "This is optional, but helpful"
    },
    {
      $formkit: "email",
      label: "Email Address",
      name: "email",
      validation: "required|email",
      placeholder: "Enter your email address here"
    }
  ]

  async function submitRequest(data: any) {
    const toast = $toast.promise("Submitting your message, please wait")
    try {
      await $fetch("/api/message/create", { body: data, method: "POST" })
      toast.resolve("Your message has been submitted successfully")
      navigateTo("/")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page title="Contact Us">
    <template #hero>
      <PageHeroSingle
        heading="Contact Us"
        description="Leave us a message, we would love to hear from you"
      />
    </template>

    <PageSection>
      <div mx-auto w="full md:50vw" p="3" rounded="md" bg="accent/5">
        <h3 font="medium" text="sm center">
          Need to tell us something, may be report an issue, request a feature
          or general feedbacks, please live us a message, we would love to hear
          from you.
        </h3>
      </div>

      <div mt="15" w="full md:70vw" mx="auto">
        <p text="md:lg center" font="semibold" mb="10">Fill the form below</p>

        <FormKit
          type="form"
          id="form"
          submit-label="Send Message"
          :submit-attrs="{ inputClass: 'w-30vw !h-12 accent-button' }"
          @submit="submitRequest"
        >
          <div grid="~ cols-1 md:cols-2 gap-4">
            <div space-y="5">
              <FormKitSchema :schema="formSchema" />
            </div>

            <div w="full" space-y="4">
              <FormKit
                type="textarea"
                label="Your Message"
                name="body"
                placeholder="Leave us a message"
                :classes="{ input: 'h-200px' }"
                validation="required"
              />
            </div>
          </div>
        </FormKit>
      </div>
    </PageSection>
  </Page>
</template>

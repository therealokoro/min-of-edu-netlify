<script lang="ts" setup>
  import type { IRecruitment } from "~/types/recruitment.types"
  const $toast = usePush()
  const slug = useRoute("e-recruitment-slug").params.slug

  const { data: rn } = await useAsyncData(`r-${slug}`, async () => {
    const res = await $fetch<IRecruitment>(`/api/recruitment/slug/${slug}`)

    return {
      id: res.id,
      description: res.description,
      requirements: res.requirements.split("|"),
      deadline: res.deadline,
      isDeadline: res.deadline < new Date(),

      meta: {
        title: res.jobTitle,
        requirements: res.requirements.split("|").join(", "),
        "Date Posted": useDateFormat(res.createdAt, "MMMM DD, YYYY").value,
        "Closing Date": useDateFormat(res.deadline, "MMMM DD, YYYY").value
      }
    }
  })

  const pageTitle = computed(() => rn.value?.meta.title ?? "E-Recruitment")

  const formContainer = ref<HTMLElement | null>(null)
  function gotoForm() {
    formContainer.value!.scrollIntoView({ behavior: "smooth" })
  }

  async function handleSubmitApplication(data: any) {
    const toast = $toast.promise("Submitting your application, please wait")

    try {
      // append all the files to a formdata
      const fd = new FormData()
      fd.append("recruitmentId", rn.value!.id)

      for (const [key, val] of Object.entries(data)) {
        if (key === "requirements") {
          for (const [_k, _v] of Object.entries(val as object)) {
            if (_v) fd.append(_k, _v)
          }
        } else fd.append(key, val as any)
      }

      await $fetch("/api/recruitment/applications/create", {
        method: "POST",
        body: fd
      })
      toast.resolve("Application sent successfully")
      navigateTo("/e-recruitment")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }
</script>

<template>
  <Page :title="pageTitle">
    <template #hero>
      <PageHeroSingle
        heading="E-Recruitment"
        description="View all our job openings and apply for the ones that best suites you"
      />
    </template>

    <PageSection
      v-if="rn"
      :heading="rn.meta.title"
      description="Below are a list of all available job openings"
    >
      <div w="full" grid="~ cols-1 md:cols-[2fr_3fr] gap-5">
        <div>
          <BaseDescriptionList :data="rn.meta" />

          <div mt="4" flex="center">
            <ui-button v-if="!rn.isDeadline" @click="gotoForm()">
              Apply For Job
            </ui-button>
          </div>
        </div>

        <div space-y="2">
          <h2 text="lg" font="bold">Job Description</h2>
          <div mx-auto text="justify" class="wysiwyg" v-html="rn.description" />
        </div>
      </div>

      <div
        ref="formContainer"
        w="full md:70vw"
        mt="20"
        mx="auto"
        bordered
        p="10"
        space-y="10"
      >
        <h2 text="2xl" font="bold">Application Form</h2>

        <div v-if="!rn.isDeadline">
          <FormKit
            type="form"
            @submit="handleSubmitApplication"
            submit-label="Submit Application"
            :submit-attrs="{ inputClass: 'w-20vw !h-10 accent-button' }"
          >
            <div w="full" grid="~ cols-1 lg:cols-2 gap-5">
              <div space-y="5">
                <FormKit
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Enter your fullname here"
                  validation="required"
                />
                <FormKit
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email address here"
                  validation="required|email"
                />
                <FormKit
                  type="tel"
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter your mobile phone number here"
                  validation="required"
                />
              </div>
              <FormKit type="group" name="requirements">
                <div space-y="5">
                  <FormKit
                    v-for="item in rn.requirements"
                    type="upload"
                    :label="`Upload ${item}`"
                    accepts="pdf|jpg|jpeg|docx|pdf|doc"
                    size="1000000"
                    :name="useSlugify(item)"
                    help="File size must not be more than 1mb"
                  />
                </div>
              </FormKit>
            </div>
          </FormKit>
        </div>

        <div v-else w="full" text="center" p="3">
          <p font="bold">
            We are sorry, but this recruitment posting has stopped recieving
            applications and is officially closed!
          </p>
        </div>
      </div>
    </PageSection>
  </Page>
</template>

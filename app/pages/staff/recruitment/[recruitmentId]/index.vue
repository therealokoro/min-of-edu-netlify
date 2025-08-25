<script lang="ts" setup>
  const rId = useRoute("admin-recruitment-recruitmentId").params.recruitmentId
  const user = useAuth().user

  const $toast = usePush()
  const applyDialog = ref(false)
  const currRecruitment = useState<any>("recruitment", () => null)
  const application = computed(() => {
    return currRecruitment.value?.applications.find(
      (c: any) => c.email == user.email
    ) as IApplication
  })

  // initial data for application form for users
  const initialData = computed(() => {
    return {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    }
  })

  const { data: snInfo } = await useAsyncData(
    `recruitment-${rId}`,
    async () => {
      const sn = await $fetch<IRecruitment | null>(`/api/recruitment/${rId}`)
      if (!sn) return null

      currRecruitment.value = {
        ...sn,
        requirements: sn.requirements.split("|"),
        deadline: String(sn!.deadline)
      }

      return {
        jobTitle: sn.jobTitle,
        description: sn.description,
        "Created At": useDateFormat(sn.createdAt, "MMMM DD, YYYY").value,
        deadline: useDateFormat(sn.deadline, "MMMM DD, YYYY").value,
        requirements: sn.requirements.split("|"),
        status: isDateExpired(sn.deadline) ? "closed" : "inProgress"
      }
    }
  )

  async function handleSubmitApplication(data: any) {
    const toast = $toast.promise("Submitting your application, please wait")

    try {
      // append all the files to a formdata
      const fd = new FormData()
      fd.append("recruitmentId", rId)

      for (const [key, val] of Object.entries(data)) {
        if (key === "requirements") {
          for (const [_k, _v] of Object.entries(val as object)) {
            fd.append(_k, _v)
          }
        } else fd.append(key, val as any)
      }

      await $fetch("/api/recruitment/applications", {
        method: "POST",
        body: fd
      })
      toast.resolve("Application sent successfully")
      navigateTo("/staff/recruitment")
    } catch (e: any) {
      toast.reject(e.data.message)
    }
  }

  const alertConfig = computed(() => {
    const status = application.value.status

    if (status == "approved") {
      return {
        title: "Approved",
        color: "green",
        message: application.value.message
      }
    } else if (status == "declined") {
      return {
        title: "Declined",
        color: "red",
        message: application.value.message
      }
    } else {
      return {
        title: "Pending",
        color: "orange",
        message:
          "We have received your application are reviewing your qualifications. We will send you a notification as soon as possible, Thank you."
      }
    }
  })
</script>

<template>
  <Page title="Recruitment Info" spacing="space-y-7">
    <UiAlert
      v-if="application"
      icon="i-tabler-info-circle"
      :title="alertConfig.title"
      :color="alertConfig.color"
      variant="solid"
      :description="alertConfig.message!"
    />

    <DashboardContentBlock>
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
    </DashboardContentBlock>

    <DashboardContentBlock heading="Job Description">
      <p>{{ currRecruitment.description }}</p>

      <div w="full" flex="center" mt="5">
        <ui-button :disabled="Boolean(application)" @click="applyDialog = true">
          Apply for Job
        </ui-button>
      </div>
    </DashboardContentBlock>

    <BaseDialog
      :ui="{ width: 'w-full lg:max-w-[70vw]' }"
      v-model="applyDialog"
      title="Job Application Form"
    >
      <FormKit
        type="form"
        :value="initialData"
        @submit="handleSubmitApplication"
        :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
      >
        <div w="full" grid="~ cols-1 lg:cols-2 gap-5">
          <div space-y="5">
            <FormKit
              type="text"
              name="name"
              label="Name"
              placeholder="Enter your fullname here"
              validation="required"
              disabled
            />

            <FormKit
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email address here"
              validation="required|email"
              disabled
            />

            <FormKit
              type="tel"
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter your mobile phone number here"
              validation="required"
              disabled
            />
          </div>

          <FormKit type="group" name="requirements">
            <div space-y="5">
              <FormKit
                v-for="item in currRecruitment.requirements"
                type="upload"
                validation="required"
                :label="`Upload ${item}`"
                accepts="pdf|jpg|jpeg"
                size="1000000"
                help="File size must not be more than 1mb"
                :name="useSlugify(item)"
                :validation-messages="{
                  required: `Please upload a file for ${item}`
                }"
              />
            </div>
          </FormKit>
        </div>
      </FormKit>
    </BaseDialog>
  </Page>
</template>

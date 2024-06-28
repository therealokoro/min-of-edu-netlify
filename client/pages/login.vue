<script setup lang="ts">
  definePageMeta({ layout: "auth" })
  const $auth = useAuthStore()
  const $toast = usePush()

  async function handleLogin(data: any) {
    const toast = $toast.promise("Checking your credentials, please wait")
    try {
      const user = await $auth.loginUser(data)
      toast.resolve({
        message: "Login was successfull, redirecting you now",
        duration: 1000
      })

      const path = user!.role == "Admin" ? "/admin" : "/staff"
      navigateTo(path)
    } catch (e: any) {
      toast.reject(e)
    }
  }
</script>

<template>
  <Page title="Portal Login Page">
    <ClientOnly>
      <div flex="1 center">
        <div
          w="90vw sm:100"
          h="full sm:auto"
          flex="lt-sm:col-center"
          p="5 md:10"
          rounded="md"
          bg="base-200"
          bordered
        >
          <!-- Form Header -->
          <div flex="col center" text="center" mb="10">
            <h1 text="sm md:xl" font="extrabold">Login</h1>
            <h2 text="xxs md:xs accent" font="medium">
              Enter your login credentials to continue
            </h2>
          </div>

          <!-- Form Body -->
          <FormKit
            type="form"
            :config="{ validationVisibility: 'submit' }"
            :submit-attrs="{ inputClass: 'w-full !h-12 accent-button' }"
            @submit="handleLogin"
          >
            <div w="full" flex="~ col gap-5">
              <FormKit
                name="email"
                type="email"
                placeholder="Enter your email address"
                label="Email Address"
              />
              <FormKit
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
              />
            </div>
          </FormKit>
        </div>
      </div>
    </ClientOnly>
  </Page>
</template>

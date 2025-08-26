<script lang="ts" setup>
  const $auth = useAuth()
  const user = computed(() => $auth.user)

  const isExpanded = ref(false)
  useNuxtApp().hook("page:start", () => {
    isExpanded.value = false
  })

  const dropdownOptions = [
    [
      {
        label: "My Profile",
        to:
          user.value?.role == "Staff"
            ? "/staff/profile"
            : "/admin/profile",
        icon: "i-tabler-user"
      }
    ],
    [
      {
        label: "Sign Out",
        icon: "i-tabler-logout",
        onClick: async () => {
          await $auth.logoutUser()
        }
      }
    ]
  ]
</script>

<template>
  <header
    w="full"
    h="$dashboard-top-bar-height"
    bg="base-200"
    border-b="1 accent/10"
  >
    <div h="full" class="auto-container" flex="horizontal">
      <!-- Mobile Menu -->
      <UiSlideover side="left" :ui="{ content: 'max-w-sm' }" v-model:open="isExpanded">
        <ui-button
          md="hidden"
          color="neutral"
          size="lg"
          icon="i-tabler-menu-2"
        />

        <template #content>
          <div
            relative
            w="full"
            h="full"
            overflow="x-hidden y-auto"
            flex="~ col"
            z="10"
            p="4"
            bg="accent"
          >
            <div mb="5" flex="~ justify-between items-center">
              <nuxt-link block p="1" bg="white/60" rounded="md" to="/">
                <img
                  alt="Kebbi Ministry for Basic and Secondary Education Logo"
                  src="/logo.png"
                  width="200"
                />
              </nuxt-link>

              <ui-button
                @click="isExpanded = false"
                icon="i-mingcute-close-line"
              />
            </div>
            
            <!-- Nav Items -->
            <div flex="1" overflow-y="auto">
              <DashboardSidePanelNav />
            </div>
          </div>
        </template>
      </UiSlideover>

      <h1 lt-lg="hidden" text="sm md:base" font="bold">Dashboard</h1>

      <!-- Action Buttons -->
      <div flex="~ gap-2" items="center">
        <h3 text="xs md:sm" font="bold">{{ user?.name }}</h3>
        <UiDropdownMenu :items="dropdownOptions">
          <UiAvatar size="sm" :alt="user?.name" />
        </UiDropdownMenu>
      </div>
    </div>
  </header>
</template>

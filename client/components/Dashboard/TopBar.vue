<script lang="ts" setup>
  const isExpanded = useExpandSideNav()
  const $auth = useAuthStore()
  const user = computed(() => $auth.getAuthUser)

  const dropdownOptions = [
    [
      {
        label: "My Profile",
        to:
          $auth.getAuthUser.role == "Staff"
            ? "/staff/profile"
            : "/admin/profile",
        icon: "i-tabler-user"
      }
    ],
    [
      {
        label: "Sign Out",
        icon: "i-tabler-logout",
        click: () => $auth.logoutUser()
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
      <!-- Page Navigation -->
      <ui-button
        md="hidden"
        color="gray"
        size="lg"
        @click="isExpanded = true"
        icon="i-tabler-menu-2"
      />

      <h1 lt-lg="hidden" text="sm md:base" font="bold">Dashboard</h1>

      <!-- Action Buttons -->
      <div flex="~ gap-2" items="center">
        <h3 text="xs md:sm" font="bold">{{ useFullname(user) }}</h3>
        <UiDropdown :items="dropdownOptions">
          <UiAvatar size="sm" :alt="useFullname(user)" />
        </UiDropdown>
      </div>
    </div>
  </header>
</template>

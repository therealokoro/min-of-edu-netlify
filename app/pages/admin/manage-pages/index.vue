<script lang="ts" setup>
  const pages = [
    { label: "Announcements", link: "announcements" },
    { label: "News", link: "news" },
    { label: "Staff Profiles", link: "staff-profiles" },
    { label: "Homepage", link: "homepage" },
    { label: "Statistics", link: "stats" }
  ]
</script>

<template>
  <Page title="Manage Pages">
    <DashboardContentBlock heading="Select a Page">
      <div w="full" grid="~ cols-2 md:cols-3 lg:cols-4 gap-5">
        <nuxt-link
          v-for="page in pages"
          flex="center"
          rounded="lg"
          bordered
          bg="base-300 hover:accent/5"
          :to="`/admin/manage-pages/${page.link}`"
          p="7"
        >
          <h3 text="sm" font="bold">{{ page.label }}</h3>
        </nuxt-link>
      </div>
    </DashboardContentBlock>
  </Page>
</template>

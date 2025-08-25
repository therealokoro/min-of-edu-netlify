<script lang="ts" setup>
  const links = [
    {
      heading: "Quick Links",
      subLinks: [
        { label: "Home", link: "/" },
        { label: "News", link: "/news" },
        { label: "Announcements", link: "/announcements" },
        { label: "About Us", link: "/about-us" },
        { label: "Contact Us", link: "/contacts" }
      ]
    },
    {
      heading: "Portals",
      subLinks: [
        { label: "Staff", link: "/staff" },
        { label: "Administrative", link: "/admin" }
      ]
    },
    {
      heading: "ICT Services",
      subLinks: [
        { label: "E-Recruitments", link: "/e-recruitment" },
      ]
    },
    {
      heading: "Extras",
      subLinks: [
        { label: "Gallery", link: "/extras/gallery" },
        { label: "Staff Profiles", link: "/extras/staff-profiles" },
        { label: "Announcements", link: "/announcements" }
      ]
    },
    {
      heading: "Socials",
      subLinks: [
        { label: "Facebook", link: "#" },
        { label: "Twitter", link: "#" },
        { label: "Email", link: "#" }
      ]
    }
  ]

  const year = computed(() => useNow().value.getFullYear())
</script>

<template>
  <footer bg="accent">
    <div>
      <div
        class="auto-container"
        p="7"
        grid="~ gap-5 px-4 py-6 lg:py-8 cols-2 md:cols-3 lg:cols-5"
        text="white"
      >
        <div v-for="item in links">
          <h2 text="sm" font="bold" underline>{{ item.heading }}</h2>

          <ul class="mt-5" text="xs" font="semibold">
            <li v-for="subItem in item.subLinks" class="mb-4">
              <nuxt-link :to="subItem.link" class="hover:underline">
                {{ subItem.label }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <div p="5" flex="center" bg="accent-dark">
        <span block font="bold" text="xs white center">
          © {{ year }}
          <nuxt-link to="/">Kebbi State Ministry of Education™ </nuxt-link>
          All Rights Reserved.
        </span>
      </div>
    </div>
  </footer>
</template>

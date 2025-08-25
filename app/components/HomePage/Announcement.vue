<script lang="ts" setup>
  // Import Swiper styles
  import "swiper/css"
  import "swiper/css/pagination"
  import "swiper/css/autoplay"

  import { Pagination, Autoplay } from "swiper/modules"
  import { Swiper, SwiperSlide } from "swiper/vue"

  const { data } = await useFetch("/api/announcement/list" , {
    default: () => []
  })
  const announcements = computed(() => data.value || [])

  const swiperConfig = {
    modules: [Pagination, Autoplay],
    pagination: { dynamicBullets: true, clickable: true },
    autoplay: {
      delay: 2500,
      disableOnInteraction: true
    }
  }
</script>

<template>
  <PageSection
    heading="Announcements"
    description="See the latest announcements about the minisitry"
    v-if="announcements.length"
  >
    <swiper v-bind="swiperConfig" class="mySwiper">
      <swiper-slide v-for="item in announcements">
        <nuxt-link
          to="/announcements/this-sdwdwqd"
          block
          p="5"
          bg="hover:base-300"
          mx="auto"
          w="70vw"
          class="text-(sm/9 md:base center)"
        >
          {{ item.body }}
        </nuxt-link>
      </swiper-slide>
    </swiper>

    <div flex="center" p="7">
      <nuxt-link class="text-lg text-accent" font="bold" to="/#">
        View More
      </nuxt-link>
    </div>
  </PageSection>
</template>

<style lang="css" scoped>
  .swiper {
    --uno: "w-full min-h-120px";
  }
</style>

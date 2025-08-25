<script lang="ts" setup>
  import "swiper/css"
  import "swiper/css/autoplay"
  import "swiper/css/navigation"

  import { Autoplay, Navigation } from "swiper/modules"
  import { Swiper, SwiperSlide } from "swiper/vue"

  defineProps<{ list: INews[] }>()

  const swiperConfig = {
    modules: [Autoplay, Navigation],
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      650: {
        slidesPerView: 2
      }
    }
  }
</script>

<template>
  <div class="auto-container" h="40vh md:60vh">
    <swiper navigation v-bind="swiperConfig" class="w-full h-full">
      <swiper-slide
        v-for="item in list"
        relative
        rounded="lg"
        overflow="hidden"
        class="news-card"
      >
        <nuxt-link :to="`/news/${item.slug}`">
          <img
            :src="item.imgUrl"
            :alt="item.title"
            rounded="lg"
            w="full"
            h="full"
            object="cover"
          />

          <div
            absolute
            inset="0"
            w="full"
            h="full"
            bg-gradient="to-t from-gray-900 to-transparent"
            p="5 md:10"
            flex="~ col"
            justify="end"
            space-y="2"
          >
            <h3
              text="white lg md:3xl"
              font="bold"
              line-clamp="1"
              :title="item.title"
            >
              {{ item.title }}
            </h3>
            <p
              text="white/80 xs md:base"
              lt-md="line-clamp-1"
              :title="item.summary"
            >
              {{ item.summary }}
            </p>
            <p text="xxs md:xs white/50">
              {{ useDateFormat(item.createdAt, "MMMM DD, YYYY") }}
            </p>
          </div>
        </nuxt-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="css" scoped>
  .news-card:hover img {
    --uno: "transition ease-in-out scale-150";
  }
</style>

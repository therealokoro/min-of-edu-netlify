<script lang="ts" setup>
  import type { IHeroSlide } from "~/types/content.types"
  import "swiper/css"
  import "swiper/css/autoplay"
  import "swiper/css/pagination"
  import "swiper/css/effect-coverflow"

  import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules"
  import { Swiper, SwiperSlide } from "swiper/vue"

  const { data } = await useFetch("/api/content/get")
  const slides = computed(() => (data.value?.heroSlider as IHeroSlide[]) || [])

  const swiperConfig = {
    modules: [Autoplay, Pagination, EffectCoverflow],
    effect: "coverflow",
    pagination: { dynamicBullets: true, clickable: true },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  }
</script>

<template>
  <div v-if="data" w="full" lt-md="max-w-400px" h="50vh md:70vh">
    <swiper v-bind="swiperConfig" class="w-full h-full">
      <swiper-slide
        v-for="item in slides"
        relative
        rounded="lg"
        overflow="hidden"
      >
        <NuxtImg
          placeholder
          preload
          format="webp"
          :src="item.imgUrl"
          :alt="item.name"
          rounded="lg"
          w="full"
          h="full"
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
          text="center"
        >
          <h3
            text="white lg md:3xl"
            font="bold"
            line-clamp="1"
            :title="item.name"
          >
            {{ item.name }}
          </h3>
          <p text="white/80 xs md:base" lt-md="line-clamp-1" :title="item.name">
            {{ item.position }}
          </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
  import "swiper/css"
  import { Swiper, SwiperSlide } from "swiper/vue"
  import { Autoplay } from "swiper/modules"

  const swiperConfig = {
    modules: [Autoplay],
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  }

  const aboutUsSlides = [
    {
      title: "Our Mission",
      body: "We strive to uphold our mandates on basic and secondary education, through planning, coordination, monitoring and control of education in Primary and Secondary schools across Kebbi State."
    },
    {
      title: "Our Vision",
      body: "To ensure that every citizen of Kebbi State has access and equal rights to basic and secondary education, through teaching and learning for brighter future to pupils and students, and holistic development of the state."
    },
    {
      title: "Our Goal",
      body: "To ensure proper planning, coordinating, monitoring and controlling of education in Primary and Secondary schools across Kebbi State."
    }
  ]
</script>

<template>
  <PageSection relative>
    <div absolute inset-0>
      <NuxtImg placeholder src="/5.jpg" size="full" object="cover" />
      <div inset="0" absolute bg="black/80" />
    </div>

    <div w="full">
      <swiper v-bind="swiperConfig" w="full">
        <swiper-slide v-for="item in aboutUsSlides" space-y="5" text="center">
          <h3 text="3xl accent" font="bold">{{ item.title }}</h3>
          <p text="white sm/10 md:base" font="semibold">{{ item.body }}</p>
        </swiper-slide>
      </swiper>
    </div>
  </PageSection>
</template>

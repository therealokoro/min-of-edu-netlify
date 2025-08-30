<script lang="ts" setup>
const slides = [
  {
    key: "slider-1",  
    imgUrl: "/tinubu.jpg",
    name: "Bola Ahmed Tinubu (GCFR)",
    position: "President, Federal Republic of Nigeria"
  },
  {
    key: "slider-2",
    imgUrl: "/kaura.jpg",
    name: "Comrade Dr. Nasir Idris (Kauran Gwandu)",
    position: "Executive Governor, Kebbi State"
  },
  {
    key: "slider-3",
    imgUrl: "/tafida.jpg",
    name: "Umar Abubakar (Tafidan Kabi)",
    position: "Deputy Governor, Kebbi State"
  },
  {
    key: "slider-4",
    imgUrl: "/commissioner-2.jpg",
    name: "Dr. Halimatu Muhammad Bande",
    position: "Hon. Commissioner For Basic and Secondary Education"
  },
  {
    key: "slider-5",
    imgUrl: "/perm-sec.jpg",
    name: "Abubakar Magaji Nayilwa",
    position: "Permanent Secretary, Min. For Basic and Secondary Education"
  }
]

// const $content = useContentStore()
// await $content.fetchContent()
// const slides = $content.getSlides
</script>

<template>
  <div v-if="slides && slides.length" class="mx-auto max-w-[640px]" aria-roledescription="carousel">
    <UiCarousel
      loop
      dots
      fade
      :items="slides"
      v-slot="{ item }"
      :autoplay="{ delay: 2000 }"
      class="w-full"
    >
      <!-- Slide box: enforces same width × height via aspect-ratio -->
      <div
        class="relative w-full overflow-hidden rounded-lg"
        style="aspect-ratio: 4/3;"
        role="group"
        :aria-label="item.name"
      >
        <img
          :src="item.imgUrl"
          :alt="item.name || 'Slide image'"
          class="w-full h-full object-cover rounded-lg"
          loading="lazy"
          decoding="async"
          draggable="false"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-10 space-y-3 text-center bg-gradient-to-t from-gray-900/85 to-transparent">
          <h3 class="text-white text-xl md:text-3xl font-bold line-clamp-1" :title="item.name">
            {{ item.name }}
          </h3>

          <p v-if="item.position" class="text-white/80 text-sm md:text-base line-clamp-1 md:line-clamp-none" :title="item.position">
            {{ item.position }}
          </p>
        </div>
      </div>
    </UiCarousel>
  </div>
</template>

<style scoped>
/* Fallback for browsers without aspect-ratio support */
@supports not (aspect-ratio: 1 / 1) {
  .relative[style] {
    min-height: 360px; /* increased fallback height for the larger size */
  }
}
</style>



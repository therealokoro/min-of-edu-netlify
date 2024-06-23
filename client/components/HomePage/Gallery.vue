<script lang="ts" setup>
  const slider = [
    {
      img: "/tinubu.jpg",
      name: "Bola Ahmed Tinubu (GCFR)",
      title: "President, Federal Republic of Nigeria"
    },
    {
      img: "/kaura.jpg",
      name: "Comrade Dr. Nasir Idris (Kauran Gwandu)",
      title: "Executive Governor, Kebbi State"
    },
    {
      img: "/tafida.jpg",
      name: "Umar Abubakar (Tafidan Kabi)",
      title: "Deputy Governor, Kebbi State"
    },
    {
      img: "/commissioner-2.jpg",
      name: "Dr. Halimatu Muhammad Bande",
      title: "Hon. Commissioner For Basic and Secondary Education"
    },
    {
      img: "/perm-sec.jpg",
      name: "Abubakar Magaji Nayilwa",
      title: "Permanent Secretary, Min. For Basic and Secondary Education"
    }
  ]
</script>

<template>
  <PageSection
    heading="From Our Gallery"
    description="A picture tells a thousand words. Have a look at our rich gallery"
  >
    <ClientOnly>
      <div class="gallery" flex="~">
        <div class="gallery-slide" flex="~">
          <div v-for="item in slider" class="relative" w="300px" h="200px">
            <NuxtImg
              placeholder
              :src="item.img"
              w="full"
              h="full"
              object="cover"
              :alt="item.name"
            />
          </div>
        </div>

        <div class="gallery-slide" flex="~">
          <div v-for="item in slider" class="relative" w="300px" h="200px">
            <NuxtImg
              placeholder
              :src="item.img"
              w="full"
              h="full"
              object="cover"
              :alt="item.name"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </PageSection>
</template>

<style lang="css" scoped>
  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
  .gallery {
    overflow: hidden;
    background: white;
    white-space: nowrap;
    position: relative;
  }

  .gallery:before,
  .gallery:after {
    position: absolute;
    top: 0;
    width: 150px;
    height: 100%;
    content: "";
    z-index: 2;
  }

  .gallery:before {
    left: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
  }

  .gallery:after {
    right: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
  }

  .gallery:hover .gallery-slide {
    animation-play-state: paused;
  }

  .gallery-slide {
    animation: 10s slide infinite linear;
  }
</style>

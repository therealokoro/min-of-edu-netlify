<script lang="ts" setup>
  const images = [
    {
      src: "/tinubu.jpg",
      title: "Bola Ahmed Tinubu (GCFR)"
    },
    {
      src: "/kaura.jpg",
      title: "Comrade Dr. Nasir Idris (Kauran Gwandu)"
    },
    {
      src: "/tafida.jpg",
      title: "Umar Abubakar (Tafidan Kabi)"
    },
    {
      src: "/commissioner-2.jpg",
      title: "Dr. Halimatu Muhammad Bande"
    },
    {
      src: "/perm-sec.jpg",
      title: "Abubakar Magaji Nayilwa"
    }
  ]
</script>

<template>
  <Page title="Galleries">
    <template #hero>
      <PageHeroSingle
        heading="Galleries"
        description="A picture tells a thousand words. Have a look at our rich gallery"
      />
    </template>

    <PageSection>
      <div w="full" grid="~ cols-2 md:cols-3 lg:cols-4 gap-5">
        <img
          width="300"
          height="200px"
          v-for="item in images"
          :src="item.src"
          :alt="item.title"
        />
      </div>
    </PageSection>
  </Page>
</template>

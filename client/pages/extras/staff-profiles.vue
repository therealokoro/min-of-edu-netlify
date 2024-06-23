<script lang="ts" setup>
  const { data: profiles, error } = await useFetch('/api/profiles/list')
</script>

<template>
  <Page title="Staff Profiles" :error="error">
    <template #hero>
      <PageHeroSingle
        heading="Staff Profiles"
        description="Below is a list of our esteemed staffs"
      />
    </template>

    <PageSection>
      <div w="70vw" mx="auto" grid="~ cols-1 md:cols-2 gap-20">
        <div
          class="img-border aspect-square"
          flex="col center gap-3"
          v-for="item in profiles"
        >
          <NuxtImg
            placeholder
            w="full"
            h="full"
            object="cover"
            :src="item.imgUrl"
            :alt="item.name"
          />

          <div text="center" mx="auto" space-y="2">
            <h2 text="lg md:xl" font="bold">{{ item.name }}</h2>
            <p text="sm md:base accent" font="bold">{{ item.position }}</p>
          </div>
        </div>
      </div>
    </PageSection>
  </Page>
</template>

<style lang="css" scoped>
  .img-border img {
    --s: 10px; /* control the size */
    padding: var(--s);
    border: calc(2 * var(--s)) solid #0000;
    outline: 1px solid #000;
    outline-offset: calc(-1 * var(--s));
    background: conic-gradient(from 90deg at 1px 1px, #0000 25%, #000 0);
  }
</style>

<script lang="ts" setup>
  const description = ref(
    "We strive to uphold our mandates on basic and secondary education, through planning, coordination, monitoring and control of education in Primary and Secondary schools across Kebbi State."
  )

  useSeoMeta({
    description,
    ogDescription: description
  })
</script>

<template>
  <Page title="About Us">
    <template #hero>
      <PageHeroSingle
        heading="About Us"
        description="Who we are, our mission, vision and goals"
      />
    </template>

    <PageSection>
      <div w="full" grid="~ cols-1 md:cols-2 gap-4">
        <!-- Vision -->
        <div bg="base-300" h="max" rounded="lg" p="10" space-y="5">
          <h1 text="lg md:xl accent" font="extrabold">Our Mision</h1>

          <ul text="sm" leading="8" list-image="[url(/checkmark.svg)]">
            <li>To build an educationally sound Generation</li>
            <li>To create a sense of Responsibilty</li>
            <li>To promote the educational standard of our people</li>
            <li>To establish a knowledgeable society</li>
            <li>
              To turn around the old perceptions on Girl-Child Education to
              contemporary challenges
            </li>
          </ul>
        </div>

        <!-- Mission, Goal, Mandate -->
        <div flex="~ col gap-4">
          <div bg="base-300" rounded="lg" p="10" space-y="5">
            <h1 text="lg md:xl accent" font="extrabold">Our Vision</h1>

            <ul text="sm" leading="8" list-image="[url(/checkmark.svg)]">
              <li>To Make the society an Englighten Generation</li>
              <li>To provide an educationally sound oriented parents</li>
              <li>To eradicate iliteracy within the populace</li>
              <li>
                To create a society were girls can tap into their inherent
                potentials
              </li>
            </ul>
          </div>

          <div bg="base-300" rounded="lg" p="10" space-y="5">
            <h1 text="lg md:xl accent" font="extrabold">Our Goal</h1>

            <p text="sm" leading="8">
              We strive to uphold our mandates on basic and secondary education,
              through planning, coordination, monitoring and control of
              education in Primary and Secondary schools across Kebbi State.
            </p>
          </div>
        </div>
      </div>
    </PageSection>
  </Page>
</template>

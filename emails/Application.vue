<script lang="ts" setup>
  import { defineProps } from "vue"
  defineProps<{ name: string; content: string }>()
</script>

<template>
  <EPreview>Application Response</EPreview>
  <EHtml lang="en">
    <EHead>
      <EFont
        font-family="Roboto"
        fallback-font-family="Verdana"
        :web-font="{
          url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
          format: 'woff2'
        }"
        font-weight="400"
        font-style="normal"
      />
    </EHead>
    <EText>Dear {{ name }},</EText>

    <EText>{{ content }}</EText>

    <EText>Regards</EText>
    <EText style="font-weight: bold">HR Team</EText>
    <EText>Kebbi Ministry for Basic & Secondary Education</EText>
  </EHtml>
</template>

<script lang="ts" setup></script>

<template>
  <header
    sticky
    top="0"
    w="full"
    text="content-200"
    h="$page-header-height-sm lg:$page-header-height"
    bg="base-200 opacity-80"
    backdrop="filter blur-sm"
    border-b="1 accent/10"
    z="10"
  >
    <div class="auto-container" h="full" flex="horizontal">
      <PageLogo w="200px md:300px" />
      <PageNavigation />
    </div>
  </header>
</template>

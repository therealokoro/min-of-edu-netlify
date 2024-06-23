<template>
  <span ref="el" style="display: inline-block">useAnimate</span>
  <button @click="play()">Start</button>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useAnimate } from "@vueuse/core"

  const el = ref()
  const {
    isSupported,
    animate,

    // actions
    play,
    pause,
    reverse,
    finish,
    cancel,

    // states
    pending,
    playState,
    replaceState,
    startTime,
    currentTime,
    timeline,
    playbackRate
  } = useAnimate(el, { transform: "scale(30)" }, 1000)
</script>

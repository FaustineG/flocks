<script setup lang="ts">
import { computed, watch } from 'vue'
import HomeView from './HomeView.vue'

const height = computed(() => window.innerHeight)
const width = computed(() => window.innerWidth)

//TODO faire quelque chose ?
watch(height, () => {
  console.log('height change')
})
watch(width, () => {
  console.log('width change')
})
</script>

<template>
  <HomeView :height="height" :width="width" />
</template>

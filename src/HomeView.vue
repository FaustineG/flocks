<template>
  <header>{{ count }}</header>
  <div v-for="(cloud, i) in clouds" :class="cloud.class" :style="cloud.style" :key="i"></div>
  <BirdComponent
    v-for="bird in flock.birds"
    :key="bird.id"
    :position-x="bird.position.x"
    :position-y="bird.position.y"
    :direction="bird.direction"
  />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import BirdComponent from './components/BirdComponent.vue'
import { useBirds } from './composables/useBirds'

const props = defineProps<{
  height: number
  width: number
}>()

const { flock, addBird, clearAllIntervals } = useBirds(props.height, props.width)
const count = ref(0)

window.addEventListener('click', (e: MouseEvent) => {
  addBird({ x: e.x, y: props.height - e.y })
})

const clouds = Array(10)
  .fill('')
  .map(() => ({
    class: 'cloud ' + (Math.random() < 0.3 ? 'small' : Math.random() > 0.5 ? 'large' : ''),
    style: { top: Math.random() * 50 + '%', left: Math.random() * 80 + '%' }
  }))

onMounted(() => {
  addBird()
  addBird()
  //FIXME hacky way to update DOM
  setInterval(() => {
    count.value++
  }, 100)
})

onBeforeUnmount(() => {
  clearAllIntervals()
})
</script>

<style scoped lang="scss">
header {
  visibility: hidden;
}

html {
  overflow: hidden;
}
</style>

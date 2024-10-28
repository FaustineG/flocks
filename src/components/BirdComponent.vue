<template>
  <div data-testid="bird" class="bird" :style="birdStyle"></div>
</template>

<script setup lang="ts">
import { Direction } from '@/models/direction'
import { computed } from 'vue'

const props = defineProps<{ positionX: number; positionY: number; direction: Direction }>()

const birdStyle = computed(() => {
  return {
    transform: `rotate(${-props.direction}deg)`,
    bottom: `${props.positionY}px`,
    left: `${props.positionX}px`
  }
})
</script>

<style scoped lang="scss">
.bird {
  background: black;
  width: 2em;
  height: 2em;
  clip-path: polygon(0 0, 50% 50%, 0 100%, 100% 50%);
  position: absolute;
  transition:
    transform 1s linear,
    left 1s linear,
    bottom 1s linear;
}
</style>

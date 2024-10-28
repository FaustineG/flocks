import type { Bird, Flock } from '@/models/bird'
import { reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { averageDirection, calculateNextPosition, findNearestBirds } from './position.helper'

type Params = {
  distance_increment?: number
  rotation_increment?: number
  time_increment?: number
  nb_of_significant_neighbors?: number
  padding?: boolean
}
export const useBirds = (height: number, width: number, params?: Params) => {
  const flock = reactive<Flock>({ birds: [] })
  const intervals = ref<any[]>([])
  const {
    distance_increment,
    nb_of_significant_neighbors,
    padding,
    rotation_increment,
    time_increment
  } = {
    distance_increment: 5,
    rotation_increment: 180,
    time_increment: 200,
    nb_of_significant_neighbors: 10,
    padding: true,
    ...params
  }

  const moveBird = (bird: Bird, distance: number) => {
    const { x, y } = calculateNextPosition(
      bird.position.x,
      bird.position.y,
      bird.direction,
      distance
    )
    const alreadySomeoneThere = !!flock.birds.find((b) => b.position.x === x && b.position.y === y)
    const padding_distance = padding ? distance * 2 : 0
    const outside =
      x < padding_distance ||
      y < padding_distance ||
      x >= width - padding_distance ||
      y >= height - padding_distance
    if (!alreadySomeoneThere && !outside) {
      bird.position.x = x
      bird.position.y = y
      const neighbourDirection = averageDirection(
        findNearestBirds(bird, flock, nb_of_significant_neighbors)
      )
      const wiggle = 45 - Math.floor(Math.random() * 90)
      bird.direction = neighbourDirection + wiggle
    } else {
      //TODO change direction
      console.log('from ' + bird.direction + ' to ' + ((bird.direction + rotation_increment) % 360))
      bird.direction = (bird.direction + rotation_increment) % 360
    }
  }

  const setBirdMovingInterval = (bird: Bird) => {
    const intervalId = setInterval(
      () => moveBird(bird, distance_increment),
      time_increment - Math.floor((Math.random() * time_increment) / 2)
    )
    intervals.value.push(intervalId)
    return intervalId
  }

  const clearAllIntervals = () => {
    intervals.value.forEach((interval) => {
      clearInterval(interval)
    })
  }

  const addBird = (
    startingPosition: { x: number; y: number } = { x: width / 2, y: height / 2 }
  ) => {
    const newBird = {
      id: uuidv4(),
      position: startingPosition,
      direction: Math.round(Math.random() * 360)
    }
    flock.birds.push(newBird)
    setBirdMovingInterval(newBird)
  }

  return {
    flock,
    setBirdMovingInterval,
    addBird,
    calculateNextPosition,
    clearAllIntervals,
    moveBird
  }
}

import type { Bird, Flock } from '@/models/bird'

export function calculateNextPosition(
  currentX: number,
  currentY: number,
  direction: number,
  distance: number
) {
  const radians = (direction * Math.PI) / 180

  const x = currentX + distance * Math.round(Math.cos(radians))
  const y = currentY + distance * Math.round(Math.sin(radians))

  return { x, y }
}

export function findNearestBirds(bird: Bird, flock: Flock, limit = 5): Bird[] {
  return flock.birds
    .map((flockBird) => ({
      ...flockBird,
      distanceBetweenBirds: Math.sqrt(
        Math.pow(bird.position.x - flockBird.position.x, 2) +
          Math.pow(bird.position.y - flockBird.position.y, 2)
      )
    }))
    .sort((a, b) => (a.distanceBetweenBirds < b.distanceBetweenBirds ? -1 : 1))
    .slice(0, limit)
}

export function averageDirection(birds: Bird[]): number {
  if (birds.length === 0) return 0
  return birds.reduce((acc, b) => (acc += b.direction), 0) / birds.length
}

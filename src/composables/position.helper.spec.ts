import { describe, expect, test } from 'vitest'
import { averageDirection, calculateNextPosition, findNearestBirds } from './position.helper'
import type { Bird, Flock } from '@/models/bird'

describe('position.helper', () => {
  describe('calculateNextPosition', () => {
    test.each([
      [0, 1, 0],
      [90, 0, 1],
      [180, -1, 0],
      [270, 0, -1]
    ])('move to %s -> (x:%i, y:%i)', (direction, expectedX, expectedY) => {
      expect(calculateNextPosition(0, 0, direction, 1)).toStrictEqual({
        x: expectedX,
        y: expectedY
      })
    })
  })

  describe('findNearestBird', () => {
    test('find nearest birds', () => {
      const bird: Bird = { id: '0', direction: 0, position: { x: 5, y: 5 } }
      const flock: Flock = {
        birds: [
          { id: '1', direction: 0, position: { x: 4, y: 4 } },
          { id: '2', direction: 0, position: { x: 0, y: 0 } },
          { id: '3', direction: 0, position: { x: 4, y: 3 } },
          { id: '4', direction: 0, position: { x: 3, y: 4 } } //same distance but 1st one will be selected
        ]
      }

      expect(findNearestBirds(bird, flock, 2).map((b) => b.id)).toStrictEqual(['1', '3'])
    })
  })

  describe('averageDirection', () => {
    test('find average direction of group of birds', () => {
      expect(averageDirection([])).toStrictEqual(0)
    })
    test('find average direction of group of birds', () => {
      const birds: Bird[] = [
        { id: '1', direction: 0, position: { x: 0, y: 0 } },
        { id: '2', direction: 90, position: { x: 0, y: 0 } },
        { id: '3', direction: 45, position: { x: 0, y: 0 } },
        { id: '4', direction: 45, position: { x: 0, y: 0 } }
      ]

      expect(averageDirection(birds)).toStrictEqual(45)
    })
  })
})

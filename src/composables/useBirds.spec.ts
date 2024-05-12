import { describe, expect, test } from 'vitest'
import { useBirds } from './useBirds'

describe('useBirds', () => {
  describe('moveBird', () => {
    const { moveBird } = useBirds(2, 2, { padding: false })

    test('should move bird north', () => {
      const myBird = { id: 'id_0', position: { x: 0, y: 0 }, direction: 90 }
      moveBird(myBird, 1)
      expect(myBird.position).toStrictEqual({ x: 0, y: 1 })
    })

    test('should not move bird bc it is at the end of window', () => {
      const myBird = { id: 'id_0', position: { x: 1, y: 1 }, direction: 90 }
      moveBird(myBird, 1)
      expect(myBird.position).toStrictEqual({ x: 1, y: 1 })
    })
  })
})

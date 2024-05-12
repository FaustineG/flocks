export interface Bird {
  id: string
  position: {
    x: number
    y: number
  }
  direction: number
}

export interface Flock {
  birds: Bird[]
}

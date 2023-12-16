import { type Platform } from './platform';

export interface Game {
  trophyId: number
  title: string
  lastTrophy: Date
  url: string

  platforms: Platform[]
}

import type { Base, BaseRest } from './base.ts'

export interface ImageRest extends BaseRest {
  url: string
  width: number
  height: number
}

export interface Image extends Base {
  url: string
  width: number
  height: number
}

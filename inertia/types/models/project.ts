import type { Base, BaseRest } from './base.ts'
import type { Image, ImageRest } from './image.ts'

export interface ProjectRest extends BaseRest {
  title: string
  description: string
  size: 'large' | 'medium' | 'small'
  stack: string
  category: {
    name: string
    label: string
  }
  perso: boolean
  link?: string
  images: {
    presentation: ImageRest
    others: ImageRest[]
  }
}

export interface Project extends Base {
  title: string
  description: string
  size: 'large' | 'medium' | 'small'
  stack: string
  category: {
    name: string
    label: string
  }
  perso: boolean
  link?: string
  images: {
    presentation: Image
    others: Image[]
  }
  maintenance?: boolean
}

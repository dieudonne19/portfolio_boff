import type { Base, BaseRest } from './base.ts'

export interface ExperienceRest extends BaseRest {
  title: string
  description: string
  companyImageLink: string
  stacks: string
  location: string
}

export interface Experience extends Base {
  title: string
  description: string
  companyImageLink: string
  stacks: string
  location: string
}

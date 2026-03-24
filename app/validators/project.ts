import vine from '@vinejs/vine'
import { imagePayloadSchema } from '#validators/image'

const sizeOptions = ['large', 'medium', 'small'] as const

export const projectValidator = vine.create({
  title: vine.string().trim().minLength(1),
  description: vine.string().trim().minLength(1),
  size: vine.enum(sizeOptions),
  stack: vine.string().trim().minLength(1),
  projectCategoryId: vine.number().positive(),
  perso: vine.boolean(),
  link: vine.string().trim().url().optional(),
  maintenance: vine.boolean().optional(),
  images: vine.object({
    presentation: imagePayloadSchema,
    others: vine.array(imagePayloadSchema),
  }),
})

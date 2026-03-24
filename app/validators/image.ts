import vine from '@vinejs/vine'

export const imagePayloadSchema = vine.object({
  url: vine.string().trim().url(),
  width: vine.number().positive(),
  height: vine.number().positive(),
})

export const imageValidator = vine.create({
  url: vine.string().trim().url(),
  width: vine.number().positive(),
  height: vine.number().positive(),
  isPresentation: vine.boolean().optional(),
  sortOrder: vine.number().min(0).optional(),
})

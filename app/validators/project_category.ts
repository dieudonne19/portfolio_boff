import vine from '@vinejs/vine'

export const projectCategoryValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(64).unique({
    table: 'project_categories',
    column: 'name',
  }),
  label: vine.string().trim().minLength(1).maxLength(64),
})

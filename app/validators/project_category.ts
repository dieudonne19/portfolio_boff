import vine from '@vinejs/vine'

const projectCategoryFields = {
  name: vine.string().trim().minLength(1).maxLength(64),
  label: vine.string().trim().minLength(1).maxLength(64),
}

export const projectCategoryValidator = vine.create({
  ...projectCategoryFields,
  name: projectCategoryFields.name.unique({
    table: 'project_categories',
    column: 'name',
  }),
})

export const updateProjectCategoryValidator = vine.withMetaData<{ categoryId: number }>().create({
  ...projectCategoryFields,
  name: projectCategoryFields.name.unique({
    table: 'project_categories',
    column: 'name',
    filter: (query, _value, field) => {
      query.whereNot('id', field.meta.categoryId)
    },
  }),
})

import ProjectCategory from '#models/project_category'

type ProjectCategoryPayload = {
  name: string
  label: string
}

export default class ProjectCategoryService {
  async list() {
    const categories = await ProjectCategory.query().orderBy('label', 'asc')
    return categories.map((category) => this.serialize(category))
  }

  async create(payload: ProjectCategoryPayload) {
    const category = await ProjectCategory.create(payload)
    return this.serialize(category)
  }

  private serialize(category: ProjectCategory) {
    return {
      id: category.id,
      name: category.name,
      label: category.label,
      createdAt: category.createdAt?.toISO() ?? null,
      updatedAt: category.updatedAt?.toISO() ?? null,
    }
  }
}

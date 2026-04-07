import ProjectCategoryService from '#services/project_category_service'
import {
  projectCategoryValidator,
  updateProjectCategoryValidator,
} from '#validators/project_category'
import type { HttpContext } from '@adonisjs/core/http'

const projectCategoryService = new ProjectCategoryService()

export default class DashboardProjectCategoriesController {
  async create({ inertia }: HttpContext) {
    const categories = await projectCategoryService.list()

    return inertia.render(
      'dashboard/project-categories/create' as never,
      {
        categories,
      } as any
    )
  }

  async edit({ inertia, params }: HttpContext) {
    const categoryId = Number(params.id)
    const [category, categories] = await Promise.all([
      projectCategoryService.find(categoryId),
      projectCategoryService.list(),
    ])

    return inertia.render(
      'dashboard/project-categories/edit' as never,
      {
        category,
        categories,
      } as any
    )
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(projectCategoryValidator)
    await projectCategoryService.create(payload)

    session.flash('success', 'Project category created')
    return response.redirect().toPath('/dashboard/project-categories/new')
  }

  async update({ request, response, session, params }: HttpContext) {
    const categoryId = Number(params.id)
    const payload = await request.validateUsing(updateProjectCategoryValidator, {
      meta: { categoryId },
    })
    await projectCategoryService.update(categoryId, payload)

    session.flash('success', 'Project category updated')
    return response.redirect().toPath('/dashboard/project-categories/new')
  }
}

import ProjectCategoryService from '#services/project_category_service'
import { projectCategoryValidator } from '#validators/project_category'
import type { HttpContext } from '@adonisjs/core/http'

const projectCategoryService = new ProjectCategoryService()

export default class DashboardProjectCategoriesController {
  async create({ inertia }: HttpContext) {
    const categories = await projectCategoryService.list()

    return inertia.render('dashboard/project-categories/create' as never, {
      categories,
    } as any)
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(projectCategoryValidator)
    await projectCategoryService.create(payload)

    session.flash('success', 'Project category created')
    return response.redirect().toPath('/dashboard/project-categories/new')
  }
}

import ProjectCategoryService from '#services/project_category_service'
import {
  projectCategoryValidator,
  updateProjectCategoryValidator,
} from '#validators/project_category'
import type { HttpContext } from '@adonisjs/core/http'

const projectCategoryService = new ProjectCategoryService()

export default class ProjectCategoriesController {
  async index({ response }: HttpContext) {
    const categories = await projectCategoryService.list()
    return response.ok(categories)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(projectCategoryValidator)
    const category = await projectCategoryService.create(payload)
    return response.created(category)
  }

  async update({ request, response, params }: HttpContext) {
    const categoryId = Number(params.id)
    const payload = await request.validateUsing(updateProjectCategoryValidator, {
      meta: { categoryId },
    })
    const category = await projectCategoryService.update(categoryId, payload)

    return response.ok(category)
  }
}

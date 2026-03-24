import ProjectService from '#services/project_service'
import { projectValidator } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'

const projectService = new ProjectService()

export default class ProjectsController {
  async index({ response }: HttpContext) {
    const projects = await projectService.list()
    return response.ok(projects)
  }

  async show({ params, response }: HttpContext) {
    const project = await projectService.findOrFail(Number(params.id))
    return response.ok(project)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(projectValidator)
    const project = await projectService.create(payload)
    return response.created(project)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(projectValidator)
    const project = await projectService.update(Number(params.id), payload)
    return response.ok(project)
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await projectService.delete(Number(params.id))
      return response.noContent()
    } catch (error) {
      return response.status(502).send({
        message:
          'Unable to delete project because one or more Cloudinary images could not be removed.',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}

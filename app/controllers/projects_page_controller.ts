import ProjectService from '#services/project_service'
import type { HttpContext } from '@adonisjs/core/http'

const projectService = new ProjectService()

export default class ProjectsPageController {
  async index({ inertia }: HttpContext) {
    const projects = await projectService.list()

    return inertia.render('projects/index' as never, {
      projects,
    } as any)
  }
}

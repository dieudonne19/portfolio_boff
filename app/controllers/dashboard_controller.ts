import ProjectService from '#services/project_service'
import type { HttpContext } from '@adonisjs/core/http'

const projectService = new ProjectService()

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const projects = await projectService.list()

    return inertia.render('dashboard' as never, {
      stats: {
        totalProjects: projects.length,
        personalProjects: projects.filter((project) => project.perso).length,
        maintainedProjects: projects.filter((project) => project.maintenance).length,
      },
      recentProjects: projects.slice(0, 4),
    } as any)
  }
}

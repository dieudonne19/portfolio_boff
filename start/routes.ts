/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ProjectsController = () => import('#controllers/projects_controller')
const ImagesController = () => import('#controllers/images_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const DashboardProjectsController = () => import('#controllers/dashboard_projects_controller')
const DashboardProjectCategoriesController = () =>
  import('#controllers/dashboard_project_categories_controller')
const ProjectCategoriesController = () => import('#controllers/project_categories_controller')
const ProjectsPageController = () => import('#controllers/projects_page_controller')

router.on('/').renderInertia('home', {}).as('home')

router.get('projects', [ProjectsPageController, 'index']).as('projects.page')

router
  .get('api/projects', [ProjectsController, 'index'])
  .use(middleware.apiKey())
  .as('projects.index')
router
  .get('api/projects/:id', [ProjectsController, 'show'])
  .use(middleware.apiKey())
  .as('projects.show')
router
  .get('api/project-categories', [ProjectCategoriesController, 'index'])
  .use(middleware.apiKey())
  .as('project_categories.index')

router
  .group(() => {
    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('dashboard', [DashboardController, 'index']).as('dashboard')
    router
      .get('dashboard/projects', [DashboardProjectsController, 'index'])
      .as('dashboard.projects.index')
    router
      .get('dashboard/projects/new', [DashboardProjectsController, 'create'])
      .as('dashboard.projects.create')
    router
      .get('dashboard/project-categories/new', [DashboardProjectCategoriesController, 'create'])
      .as('dashboard.project_categories.create')
    router
      .get('dashboard/project-categories/:id/edit', [DashboardProjectCategoriesController, 'edit'])
      .as('dashboard.project_categories.edit')
    router.post('logout', [controllers.Session, 'destroy'])
    router
      .post('dashboard/projects', [DashboardProjectsController, 'store'])
      .as('dashboard.projects.store')
    router
      .post('dashboard/project-categories', [DashboardProjectCategoriesController, 'store'])
      .as('dashboard.project_categories.store')
    router
      .put('dashboard/project-categories/:id', [DashboardProjectCategoriesController, 'update'])
      .as('dashboard.project_categories.update')

    router.post('api/projects', [ProjectsController, 'store']).as('projects.store')
    router.put('api/projects/:id', [ProjectsController, 'update']).as('projects.update')
    router.delete('api/projects/:id', [ProjectsController, 'destroy']).as('projects.destroy')
    router
      .post('api/project-categories', [ProjectCategoriesController, 'store'])
      .as('project_categories.store')
    router
      .put('api/project-categories/:id', [ProjectCategoriesController, 'update'])
      .as('project_categories.update')

    router.post('api/projects/:projectId/images', [ImagesController, 'store']).as('images.store')
    router
      .post('api/projects/:projectId/images/upload', [ImagesController, 'upload'])
      .as('images.upload')
    router.put('api/images/:id', [ImagesController, 'update']).as('images.update')
    router.delete('api/images/:id', [ImagesController, 'destroy']).as('images.destroy')
  })
  .use(middleware.auth())

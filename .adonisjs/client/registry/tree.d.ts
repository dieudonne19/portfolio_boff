/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  projects: {
    page: typeof routes['projects.page']
    index: typeof routes['projects.index']
    show: typeof routes['projects.show']
    store: typeof routes['projects.store']
    update: typeof routes['projects.update']
    destroy: typeof routes['projects.destroy']
  }
  projectCategories: {
    index: typeof routes['project_categories.index']
    store: typeof routes['project_categories.store']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  dashboard: typeof routes['dashboard'] & {
    projects: {
      index: typeof routes['dashboard.projects.index']
      create: typeof routes['dashboard.projects.create']
      store: typeof routes['dashboard.projects.store']
    }
    projectCategories: {
      create: typeof routes['dashboard.project_categories.create']
      store: typeof routes['dashboard.project_categories.store']
    }
  }
  images: {
    store: typeof routes['images.store']
    upload: typeof routes['images.upload']
    update: typeof routes['images.update']
    destroy: typeof routes['images.destroy']
  }
}

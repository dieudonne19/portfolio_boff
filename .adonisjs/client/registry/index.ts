/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'projects.page': {
    methods: ["GET","HEAD"],
    pattern: '/projects',
    tokens: [{"old":"/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.page']['types'],
  },
  'projects.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/projects',
    tokens: [{"old":"/api/projects","type":0,"val":"api","end":""},{"old":"/api/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.index']['types'],
  },
  'projects.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/projects/:id',
    tokens: [{"old":"/api/projects/:id","type":0,"val":"api","end":""},{"old":"/api/projects/:id","type":0,"val":"projects","end":""},{"old":"/api/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.show']['types'],
  },
  'project_categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/project-categories',
    tokens: [{"old":"/api/project-categories","type":0,"val":"api","end":""},{"old":"/api/project-categories","type":0,"val":"project-categories","end":""}],
    types: placeholder as Registry['project_categories.index']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard']['types'],
  },
  'dashboard.projects.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/projects',
    tokens: [{"old":"/dashboard/projects","type":0,"val":"dashboard","end":""},{"old":"/dashboard/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['dashboard.projects.index']['types'],
  },
  'dashboard.projects.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/projects/new',
    tokens: [{"old":"/dashboard/projects/new","type":0,"val":"dashboard","end":""},{"old":"/dashboard/projects/new","type":0,"val":"projects","end":""},{"old":"/dashboard/projects/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['dashboard.projects.create']['types'],
  },
  'dashboard.project_categories.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/project-categories/new',
    tokens: [{"old":"/dashboard/project-categories/new","type":0,"val":"dashboard","end":""},{"old":"/dashboard/project-categories/new","type":0,"val":"project-categories","end":""},{"old":"/dashboard/project-categories/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['dashboard.project_categories.create']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'dashboard.projects.store': {
    methods: ["POST"],
    pattern: '/dashboard/projects',
    tokens: [{"old":"/dashboard/projects","type":0,"val":"dashboard","end":""},{"old":"/dashboard/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['dashboard.projects.store']['types'],
  },
  'dashboard.project_categories.store': {
    methods: ["POST"],
    pattern: '/dashboard/project-categories',
    tokens: [{"old":"/dashboard/project-categories","type":0,"val":"dashboard","end":""},{"old":"/dashboard/project-categories","type":0,"val":"project-categories","end":""}],
    types: placeholder as Registry['dashboard.project_categories.store']['types'],
  },
  'projects.store': {
    methods: ["POST"],
    pattern: '/api/projects',
    tokens: [{"old":"/api/projects","type":0,"val":"api","end":""},{"old":"/api/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.store']['types'],
  },
  'projects.update': {
    methods: ["PUT"],
    pattern: '/api/projects/:id',
    tokens: [{"old":"/api/projects/:id","type":0,"val":"api","end":""},{"old":"/api/projects/:id","type":0,"val":"projects","end":""},{"old":"/api/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.update']['types'],
  },
  'projects.destroy': {
    methods: ["DELETE"],
    pattern: '/api/projects/:id',
    tokens: [{"old":"/api/projects/:id","type":0,"val":"api","end":""},{"old":"/api/projects/:id","type":0,"val":"projects","end":""},{"old":"/api/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.destroy']['types'],
  },
  'project_categories.store': {
    methods: ["POST"],
    pattern: '/api/project-categories',
    tokens: [{"old":"/api/project-categories","type":0,"val":"api","end":""},{"old":"/api/project-categories","type":0,"val":"project-categories","end":""}],
    types: placeholder as Registry['project_categories.store']['types'],
  },
  'images.store': {
    methods: ["POST"],
    pattern: '/api/projects/:projectId/images',
    tokens: [{"old":"/api/projects/:projectId/images","type":0,"val":"api","end":""},{"old":"/api/projects/:projectId/images","type":0,"val":"projects","end":""},{"old":"/api/projects/:projectId/images","type":1,"val":"projectId","end":""},{"old":"/api/projects/:projectId/images","type":0,"val":"images","end":""}],
    types: placeholder as Registry['images.store']['types'],
  },
  'images.upload': {
    methods: ["POST"],
    pattern: '/api/projects/:projectId/images/upload',
    tokens: [{"old":"/api/projects/:projectId/images/upload","type":0,"val":"api","end":""},{"old":"/api/projects/:projectId/images/upload","type":0,"val":"projects","end":""},{"old":"/api/projects/:projectId/images/upload","type":1,"val":"projectId","end":""},{"old":"/api/projects/:projectId/images/upload","type":0,"val":"images","end":""},{"old":"/api/projects/:projectId/images/upload","type":0,"val":"upload","end":""}],
    types: placeholder as Registry['images.upload']['types'],
  },
  'images.update': {
    methods: ["PUT"],
    pattern: '/api/images/:id',
    tokens: [{"old":"/api/images/:id","type":0,"val":"api","end":""},{"old":"/api/images/:id","type":0,"val":"images","end":""},{"old":"/api/images/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['images.update']['types'],
  },
  'images.destroy': {
    methods: ["DELETE"],
    pattern: '/api/images/:id',
    tokens: [{"old":"/api/images/:id","type":0,"val":"api","end":""},{"old":"/api/images/:id","type":0,"val":"images","end":""},{"old":"/api/images/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['images.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}

import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'projects.page': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project_categories.index': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'dashboard.projects.index': { paramsTuple?: []; params?: {} }
    'dashboard.projects.create': { paramsTuple?: []; params?: {} }
    'dashboard.project_categories.create': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'dashboard.projects.store': { paramsTuple?: []; params?: {} }
    'dashboard.project_categories.store': { paramsTuple?: []; params?: {} }
    'projects.store': { paramsTuple?: []; params?: {} }
    'projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project_categories.store': { paramsTuple?: []; params?: {} }
    'images.store': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'images.upload': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'images.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'projects.page': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project_categories.index': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'dashboard.projects.index': { paramsTuple?: []; params?: {} }
    'dashboard.projects.create': { paramsTuple?: []; params?: {} }
    'dashboard.project_categories.create': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'projects.page': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project_categories.index': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'dashboard.projects.index': { paramsTuple?: []; params?: {} }
    'dashboard.projects.create': { paramsTuple?: []; params?: {} }
    'dashboard.project_categories.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'dashboard.projects.store': { paramsTuple?: []; params?: {} }
    'dashboard.project_categories.store': { paramsTuple?: []; params?: {} }
    'projects.store': { paramsTuple?: []; params?: {} }
    'project_categories.store': { paramsTuple?: []; params?: {} }
    'images.store': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
    'images.upload': { paramsTuple: [ParamValue]; params: {'projectId': ParamValue} }
  }
  PUT: {
    'projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'images.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
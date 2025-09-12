export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options',
  HEAD = 'head'
}

export interface RouteMetadata {
  path: string;
  method: RequestMethod;
  middlewares: any[];
  propertyKey: string | symbol;
}

export interface ControllerMetadata {
  basePath: string;
  routes: RouteMetadata[];
}
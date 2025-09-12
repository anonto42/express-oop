import { RequestMethod } from "./RequestMethord";

export function Route(method: RequestMethod, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const controllerPath = Reflect.getMetadata('basePath', target.constructor) || '';
    const fullPath = controllerPath + path;

    Reflect.defineMetadata('method', method, target, propertyKey);
    Reflect.defineMetadata('path', fullPath, target, propertyKey);
  };
}

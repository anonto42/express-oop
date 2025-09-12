import 'reflect-metadata';
import { RequestMethod } from './RequestMethord';

export function Route(method: RequestMethod, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Get the basePath from the controller's metadata
    const controllerPath = Reflect.getMetadata('basePath', target.constructor);
    
    // Combine the controller path and method path
    const fullPath = controllerPath + path;

    // Store the metadata for the route
    Reflect.defineMetadata('method', method, target, propertyKey);
    Reflect.defineMetadata('path', fullPath, target, propertyKey);
  };
}

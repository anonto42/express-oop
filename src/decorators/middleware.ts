import 'reflect-metadata';

export function Middleware(middleware: Function) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata('middlewares', target, propertyKey) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata('middlewares', middlewares, target, propertyKey);
  };
}
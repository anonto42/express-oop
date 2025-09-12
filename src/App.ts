import express from 'express';
import 'reflect-metadata';
import { RequestMethod } from './decorators/RequestMethord';
import { UserController } from './module/user/user.controller';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const userController = new UserController();
    const prototype = Object.getPrototypeOf(userController);

    Object.getOwnPropertyNames(prototype).forEach((method) => {
      if (method === 'constructor') return; // skip constructor

      const routePath = Reflect.getMetadata('path', userController, method);
      const httpMethod: RequestMethod = Reflect.getMetadata('method', userController, method);
      const middlewares = Reflect.getMetadata('middlewares', userController, method) || [];

      // ✅ Only register if this method has @Route
      if (routePath && httpMethod) {
        const handler = (userController as any)[method].bind(userController);

        if (middlewares.length > 0) {
          this.app[httpMethod](routePath, ...middlewares, handler);
        } else {
          this.app[httpMethod](routePath, handler);
        }
      }
    });
  }

}

export default App;
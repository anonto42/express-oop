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

    // Get all the methods in the controller
    const methods = Object.getOwnPropertyNames(userController.constructor.prototype);

    methods.forEach((method) => {
      const routePath = Reflect.getMetadata('path', userController, method);
      const httpMethod: RequestMethod = Reflect.getMetadata('method', userController, method);
      const middlewares = Reflect.getMetadata('middlewares', userController, method) || [];

      if (routePath && httpMethod) {
        const handler = (userController as any)[method].bind(userController);

        // Register the route with middleware if any
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
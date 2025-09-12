// import express from 'express';
// import 'reflect-metadata';
// import { RequestMethod } from './decorators/RequestMethord';
// import { UserController } from './module/user/user.controller';

// class App {
//   public app: express.Application;

//   constructor() {
//     this.app = express();
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     const userController = new UserController();

//     // Get all the methods in the controller
//     const methods = Object.getOwnPropertyNames(userController.constructor.prototype);

//     methods.forEach((method) => {
//       const routePath = Reflect.getMetadata('path', userController, method);
//       const httpMethod: RequestMethod = Reflect.getMetadata('method', userController, method);
//       const middlewares = Reflect.getMetadata('middlewares', userController, method) || [];

//       if (routePath && httpMethod) {
//         const handler = (userController as any)[method].bind(userController);

//         // Register the route with middleware if any
//         if (middlewares.length > 0) {
//           this.app[httpMethod](routePath, ...middlewares, handler);
//         } else {
//           this.app[httpMethod](routePath, handler);
//         }
//       }
//     });
//   }
// }

// export default App;

// app.ts
import express from 'express';
import 'reflect-metadata';
import { UserController } from './module/user/user.controller';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { RequestMethod } from './decorators/RequestMethord';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestLogger);
  }

  private initializeRoutes() {
    const controllers = [
      new UserController(),
      // Add other controllers here
    ];

    controllers.forEach(controller => {
      this.registerControllerRoutes(controller);
    });

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    // Handle 404 for undefined routes
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
      });
    });
  }

  private registerControllerRoutes(controller: any) {
    const controllerName = controller.constructor.name;
    const basePath = Reflect.getMetadata('basePath', controller.constructor) || '';
    
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(controller));
    
    methods.forEach((method) => {
      if (method === 'constructor') return;
      
      const routePath = Reflect.getMetadata('path', controller, method);
      const httpMethod: RequestMethod = Reflect.getMetadata('method', controller, method);
      const middlewares = Reflect.getMetadata('middlewares', controller, method) || [];

      if (routePath && httpMethod) {
        const fullPath = `${basePath}${routePath}`;
        const handler = controller[method].bind(controller);
        
        console.log(`Registering route: ${httpMethod.toUpperCase()} ${fullPath}`);
        
        if (middlewares.length > 0) {
          this.app[httpMethod](fullPath, ...middlewares, handler);
        } else {
          this.app[httpMethod](fullPath, handler);
        }
      }
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export default App;
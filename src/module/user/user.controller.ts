import { Middleware } from "../../decorators/middleware";
import { RequestMethod } from "../../decorators/RequestMethord";
import { Route } from "../../decorators/Route";
import { loggerMiddleware } from "../../middleware/loggerMiddleware";
import { Controller } from '../../decorators/Controller';

@Controller('/users')
export class UserController {
  
  @Route(RequestMethod.GET, '/')
  @Middleware(loggerMiddleware)
  public getUsers(req: any, res: any): void {
    
    res.json({ message: 'List of users' });
  }

  @Route(RequestMethod.POST, '/')
  @Middleware(loggerMiddleware)
  public createUser(req: any, res: any): void {
    
    res.json({ message: 'User created' });
  }
}

import { Router } from "express";
import { UserController } from "./user.controller";

export class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.userController.getMessage);
    this.router.get("/all", this.userController.getAllUsers);
  }
}

export default new UserRoutes().router;
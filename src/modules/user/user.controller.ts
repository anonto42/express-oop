import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getMessage = (req: Request, res: Response): void => {
    const message = this.userService.getMessage();
    res.json({ message });
  };

  public getAllUsers = (req: Request, res: Response): void => {
    const users = this.userService.getAllUsers();
    res.json({ users });
  };
}

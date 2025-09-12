import { Request, Response, NextFunction } from 'express';

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export interface ErrorMiddleware {
  (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void>;
}

export interface AuthMiddleware extends Middleware {
  // Add auth-specific types if needed
}
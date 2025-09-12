import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: string;
      // Add any other custom properties you want to add to the request object
    }
  }
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'super_admin' | 'admin' | 'user' | 'guest';

// Extend the Request interface to include your custom properties
export interface AuthenticatedRequest extends Express.Request {
  user: IUser;
  userId: string;
}
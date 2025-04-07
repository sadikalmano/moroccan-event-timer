
import { UserAuth } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

// This export is needed to make this a module
export {};

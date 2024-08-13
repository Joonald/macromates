import { Types } from "mongoose";
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string | undefined;
      }; // or whatever your user type is
    }
  }
}

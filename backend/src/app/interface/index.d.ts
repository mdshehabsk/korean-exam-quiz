import { IUser } from "../modules/user/user.interface";
declare global {
  namespace Express {
    interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: IUser;
    }
  }
}

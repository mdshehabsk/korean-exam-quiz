/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  id: any;
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  profileImg: string;
  // verificationID?: string;
  role?: "Admin" | "Vendor" | "User";
  status: "Active" | "Blocked";
  isDeleted: boolean;
  vendor: Types.ObjectId;
  cart: Types.ObjectId;
  buyedProducts: Types.ObjectId[];
}

// Custom static methods:
export interface UserModel extends Model<IUser> {
  userExists(email: string): Promise<IUser | null>;
  isPasswordMatch(plainPass: string, hashedPass: string): Promise<boolean>;
  JwtIssueBeforePassChange(
    passwordChangedTimeStamp: Date,
    jwtIssueTimeStamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

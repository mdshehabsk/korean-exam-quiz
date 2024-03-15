/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  username: string;
  email: string;
  password: string;

  // verificationID?: string;
  role?: "Admin" | "User";
  status: "Active" | "Blocked";
  isDeleted: boolean;

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

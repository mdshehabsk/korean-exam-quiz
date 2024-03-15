
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";

import { User } from "../User/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  // check if the user exists
  // const isUserExist = await User.findOne({ id: payload?.id });
  const isUserExist = await User.userExists(payload?.email);
  const user = await User.findOne({ email: payload?.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found !");
  }
  // throw error if password not matches:
  if (!payload?.password || !isUserExist?.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }
  const isPasswordMatch = await User.isPasswordMatch(
    payload?.password,
    isUserExist?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match");
  }

  // create token and sent to the client

  // Access Granted: Send AccessToken, RefreshToken
  return {
    user,
  };
};

export const AuthServices = {
  loginUser,
  // validateUser,


};

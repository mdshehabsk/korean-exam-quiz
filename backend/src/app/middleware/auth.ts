/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { AppError } from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";
import config from "../config";

type TRequiredRole = Array<(typeof USER_ROLE)[keyof typeof USER_ROLE]>;

const auth = (...requiredRoles: TRequiredRole) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    const user_id = req.cookies.user_id;
    if (!user_id) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    const token = jwt.verify(user_id, config.jwt_access_secret!) as any;

    // if no token received throw error
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    const userId = token.userId;
    // console.log(userId)
    // checking if the given token is valid | verify the received token
    // const decoded = jwt.verify(
    //   token,
    //   config.jwt_access_secret as string
    // ) as JwtPayload;

    // const { role, userId, iat } = decoded;
    // user existence check:
    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found !");
    }
    if (
      requiredRoles &&
      isUserExist.role !== undefined &&
      !requiredRoles.includes(isUserExist?.role)
    ) {
      // checking if user meets the required roles
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to perform this action"
      );
    }

    // // Decoded
    // req.user = decoded as JwtPayload;
    req.user = isUserExist;
    next();
  });
};

export default auth;

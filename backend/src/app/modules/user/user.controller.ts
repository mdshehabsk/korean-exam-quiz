// import studentZodSchema from '../student/student.validation';
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config/index";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import sendResponseWithCookie from "../../utils/sendResponseWithCookie";
import { Express } from "express";

const createUser = catchAsync(async (req, res) => {
  const profileImg = req.file as Express.Multer.File;

  const { user, email_exist, username_exist } = await UserServices.createUser({
    body: req.body,
    profileImg,
  });
  if (email_exist) {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: "email already exist",
      data: null,
    });
  }
  if (username_exist) {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: false,
      message: "username already exist",
      data: null,
    });
  }

  const userId = user?._id;
  const signedUser = jwt.sign({ userId }, config.jwt_access_secret as string);

  sendResponseWithCookie(
    res,
    {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Signup successful",

      session_id: undefined,
      user_id: signedUser,
    },
    "user_id"
  );
});

const getUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const user = await UserServices.getUser(userId);

  sendResponse(res, {
    data: user,
    statusCode: httpStatus.OK,
    success: true,
    message: "user get successful",
  });
});

//get cart

// const getCart = catchAsync(async (req, res) => {
//   const userId = req.user.id;
//   const cart = await UserServices.getCart(userId);

//   sendResponse(res, {
//     data: cart,
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "cart get successful",
//   });
// });

const getCategory = catchAsync(async (req, res) => {
  const result = await UserServices.getCategory();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const getOrderedItems = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const result = await UserServices.getOrderedItems(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order history retrieved successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getUser,
  // getCart,
  getCategory,
  getOrderedItems,
};

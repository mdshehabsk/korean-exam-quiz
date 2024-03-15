import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import sendResponseWithCookie from "../../utils/sendResponseWithCookie";
import { AuthServices } from "./auth.service";
const loginUser = catchAsync(async (req, res) => {
	const result = await AuthServices.loginUser(req.body);
	const { user } = result;

	const userId = user?._id;
	const signedUser = jwt.sign({ userId }, config.jwt_access_secret as string);

	sendResponseWithCookie(
		res,
		{
			statusCode: httpStatus.OK,
			success: true,
			message: "User Login successful",

			session_id: undefined,
			user_id: signedUser,
		},
		"user_id"
	);
});
// const validateUser = catchAsync(async (req, res) => {
//   const cookies = req.cookies.user;
//   // const token = payload?.split(" ")[1];
//   const decoded = jwt.verify(cookies, config.jwt_access_secret!);

//   console.log(decoded);

//   // if (!token) {
//   //   throw new AppError(404, "Token missing");
//   // }

//   // const result = await AuthServices.validateUser(token);

//   // sendResponse(res, {
//   //   statusCode: httpStatus.OK,
//   //   success: true,
//   //   message: "User Login successful",
//   //   data: result,
//   // });
// });



const logoutUser = catchAsync(async (req, res) => {
	const cookieExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const response = {
		success: true,
		message: "User Logout successful",
	};
	res
		.status(httpStatus.OK)
		.clearCookie("user_id", {
			expires: cookieExpires,
			secure: true,
			sameSite: "none",
		})
		.json(response);
});

export const AuthControllers = {
	loginUser,
	logoutUser,
	// validateUser,
};

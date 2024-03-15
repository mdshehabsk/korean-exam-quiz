"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponseWithCookie_1 = __importDefault(require("../../utils/sendResponseWithCookie"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    const { user } = result;
    const userId = user === null || user === void 0 ? void 0 : user._id;
    const signedUser = jsonwebtoken_1.default.sign({ userId }, config_1.default.jwt_access_secret);
    (0, sendResponseWithCookie_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Login successful",
        session_id: undefined,
        user_id: signedUser,
    }, "user_id");
}));
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
const logoutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookieExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const response = {
        success: true,
        message: "User Logout successful",
    };
    res
        .status(http_status_1.default.OK)
        .clearCookie("user_id", {
        expires: cookieExpires,
        secure: true,
        sameSite: "none",
    })
        .json(response);
}));
exports.AuthControllers = {
    loginUser,
    logoutUser,
    // validateUser,
};

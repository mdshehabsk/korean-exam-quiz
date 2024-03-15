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
exports.UserController = void 0;
// import studentZodSchema from '../student/student.validation';
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../../config/index"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const sendResponseWithCookie_1 = __importDefault(require("../../utils/sendResponseWithCookie"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileImg = req.file;
    const { user, email_exist, username_exist } = yield user_service_1.UserServices.createUser({
        body: req.body,
        profileImg,
    });
    if (email_exist) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.FORBIDDEN,
            success: false,
            message: "email already exist",
            data: null,
        });
    }
    if (username_exist) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.FORBIDDEN,
            success: false,
            message: "username already exist",
            data: null,
        });
    }
    const userId = user === null || user === void 0 ? void 0 : user._id;
    const signedUser = jsonwebtoken_1.default.sign({ userId }, index_1.default.jwt_access_secret);
    (0, sendResponseWithCookie_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Signup successful",
        session_id: undefined,
        user_id: signedUser,
    }, "user_id");
}));
const getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const user = yield user_service_1.UserServices.getUser(userId);
    (0, sendResponse_1.default)(res, {
        data: user,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "user get successful",
    });
}));
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
exports.UserController = {
    createUser,
    getUser,
};

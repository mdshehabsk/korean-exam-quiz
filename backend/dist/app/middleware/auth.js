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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../errors/AppError");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/User/user.model");
const config_1 = __importDefault(require("../config"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // const token = req.headers.authorization;
        const user_id = req.cookies.user_id;
        if (!user_id) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        const token = jsonwebtoken_1.default.verify(user_id, config_1.default.jwt_access_secret);
        // if no token received throw error
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not authorized");
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
        const isUserExist = yield user_model_1.User.findById(userId);
        if (!isUserExist) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "User not found !");
        }
        if (requiredRoles &&
            isUserExist.role !== undefined) {
            // checking if user meets the required roles
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not authorized to perform this action");
        }
        // // Decoded
        // req.user = decoded as JwtPayload;
        req.user = isUserExist;
        next();
    }));
};
exports.default = auth;

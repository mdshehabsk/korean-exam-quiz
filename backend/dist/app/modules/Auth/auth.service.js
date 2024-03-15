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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../User/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user exists
    // const isUserExist = await User.findOne({ id: payload?.id });
    const isUserExist = yield user_model_1.User.userExists(payload === null || payload === void 0 ? void 0 : payload.email);
    const user = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!isUserExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "User not found !");
    }
    // throw error if password not matches:
    if (!(payload === null || payload === void 0 ? void 0 : payload.password) || !(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "Password is required");
    }
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordMatch) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, "Password doesn't match");
    }
    // create token and sent to the client
    // Access Granted: Send AccessToken, RefreshToken
    return {
        user,
    };
});
exports.AuthServices = {
    loginUser,
    // validateUser,
};

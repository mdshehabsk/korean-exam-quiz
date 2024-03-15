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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ body, profileImg, }) {
    const userExist = yield user_model_1.User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
    });
    if ((userExist === null || userExist === void 0 ? void 0 : userExist.username) === body.username) {
        return {
            username_exist: true,
        };
    }
    if ((userExist === null || userExist === void 0 ? void 0 : userExist.email) === body.email) {
        return {
            email_exist: true,
        };
    }
    const user = yield user_model_1.User.create(Object.assign({}, body));
    return { user };
});
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId)
        .select("firstName lastName name  profileImg  email  role  phone cart, buyedProducts")
        .populate({
        path: "cart",
        populate: { path: "products" },
    })
        .populate("buyedProducts");
    return user;
});
exports.UserServices = {
    createUser,
    getUser,
};

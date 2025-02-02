"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.validateBodyRequest)(auth_validation_1.AuthZodValidation.LoginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post("/logout", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), auth_controller_1.AuthControllers.logoutUser);
exports.AuthRoutes = router;

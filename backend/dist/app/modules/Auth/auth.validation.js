"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthZodValidation = void 0;
const zod_1 = require("zod");
const LoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "An Email is required" }),
        password: zod_1.z.string({ required_error: "The password is required" }),
    }),
});
exports.AuthZodValidation = {
    LoginValidationSchema,
};

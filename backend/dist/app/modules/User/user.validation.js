"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const CreateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z
            .string({
            invalid_type_error: "Password must be a valid string",
        })
            .max(30, { message: "Password cannot be more than 30 characters" }),
        status: zod_1.z.enum(["Active", "Pending"]).optional(),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
exports.UserValidation = {
    CreateUserZodSchema,
};

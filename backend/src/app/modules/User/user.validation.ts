import { z } from "zod";

const CreateUserZodSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z
      .string({
        invalid_type_error: "Password must be a valid string",
      })
      .max(30, { message: "Password cannot be more than 30 characters" }),
    status: z.enum(["Active", "Pending"]).optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const UserValidation = {
  CreateUserZodSchema,
};

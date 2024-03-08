import { z } from "zod";

const CreateUserZodSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, { message: "First name should be more than 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name should be more than 2 characters" }),
    username: z.string(),
    email: z.string(),
    password: z
      .string({
        invalid_type_error: "Password must be a valid string",
      })
      .max(30, { message: "Password cannot be more than 30 characters" }),
    phone: z.string(),
    // profileImg: z.string(),
    verificationID: z.string().optional(),
    role: z.enum(["Admin", "Vendor", "User"]).optional(),
    status: z.enum(["Active", "Pending"]).optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const UserValidation = {
  CreateUserZodSchema,
};

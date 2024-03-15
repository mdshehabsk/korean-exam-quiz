import { z } from "zod";

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "An Email is required" }),
    password: z.string({ required_error: "The password is required" }),
  }),
});



export const AuthZodValidation = {
  LoginValidationSchema,
};

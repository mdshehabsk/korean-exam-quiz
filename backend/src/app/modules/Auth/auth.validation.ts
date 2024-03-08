import { z } from "zod";

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "An Email is required" }),
    password: z.string({ required_error: "The password is required" }),
  }),
});

const credentialChangeMailGet = z.object({
  body: z.object({
    email: z.string({ required_error: "An Email is required" }),
  }),
});

const credentialChangeOtpAndPassGet = z.object({
  body: z.object({
    otp: z.string({ required_error: "An Otp needed" }),
    password: z.string({ required_error: "New password needed" }),
  }),
});


const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmNewPassword: z.string()
  })
})

export const AuthZodValidation = {
  LoginValidationSchema,

  credentialChangeMailGet,
  credentialChangeOtpAndPassGet,
  changePasswordValidation
};

import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthZodValidation } from "./auth.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthZodValidation.LoginValidationSchema),
  AuthControllers.loginUser
);


router.post(
  "/logout",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  AuthControllers.logoutUser
);


export const AuthRoutes = router;

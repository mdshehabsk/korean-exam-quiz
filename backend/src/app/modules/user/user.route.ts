import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { upload } from "../uploadFile/awsUpload";
const router = express.Router();

const userImage = upload.single("profileImg");
router.post(
  "/create-user",
  userImage,
  validateRequest(UserValidation.CreateUserZodSchema),

  UserController.createUser
);
router.get(
  "/get-user/",
  auth(USER_ROLE.USER, USER_ROLE.VENDOR, USER_ROLE.ADMIN),
  UserController.getUser
);

// router.get(
//   "/get-cart",
//   auth(USER_ROLE.USER, USER_ROLE.VENDOR, USER_ROLE.ADMIN),
//   UserController.getCart
// );

router.get(
  "/get-order-history",
  auth(USER_ROLE.USER, USER_ROLE.VENDOR, USER_ROLE.ADMIN),
  UserController.getOrderedItems
);

router.get("/get-categories", UserController.getCategory);

export const UserRoutes = router;

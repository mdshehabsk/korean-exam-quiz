import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { VendorValidation } from "../vendor/vendor.validation";
import { CategoryControllers } from "../category/category.controller";
import { CategoryValidation } from "../category/category.validation";
import { VendorController } from "../vendor/vendor.controller";
import { ProductControllers } from "../product/product.controller";

const router = Router();

router.get(
  "/get-pending-vendor-request",
  auth(USER_ROLE.ADMIN),
  AdminController.getPendingVendorRequest
);
router.patch(
  "/update-vendor-request/:vendorId",
  auth(USER_ROLE.ADMIN),
  AdminController.updateVendorRequest
);

router.patch(
  "/vendor-profile-update/:vendorId",
  validateRequest(VendorValidation.UpdateVendorProfile),
  AdminController.updateVendorProfile
);

// admin product related route

router.get(
  "/get-pending-products",
  auth(USER_ROLE.ADMIN, USER_ROLE.VENDOR),
  AdminController.getPendingProducts
);

router.patch(
  "/product-status-update/:productId",
  auth(USER_ROLE.ADMIN),
  AdminController.updateProductStatus
);

router.post(
  "/add-category",
  auth(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.CreateCategoryValidation),
  CategoryControllers.createCategory
);

router.put(
  "/update-category",
  auth(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.CreateCategoryValidation),
  CategoryControllers.updateCategory
);

router.post(
  "/delete-category/:categoryId",
  auth(USER_ROLE.ADMIN),
  CategoryControllers.deleteCategory
);

router.get(
  "/get-approved-vendors",
  auth(USER_ROLE.ADMIN),
  AdminController.getApprovedVendor
);

router.put(
  "/update-vendor-commission",
  auth(USER_ROLE.ADMIN),
  validateRequest(VendorValidation.UpdateVendorProfile),
  VendorController.updateVendorCommission
);

router.put(
  "/update-product-category",
  auth(USER_ROLE.ADMIN),
  ProductControllers.updateProductCategory
);

export const AdminRoutes = router;

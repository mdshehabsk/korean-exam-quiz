import httpStatus from "http-status";
import { User } from "../user/user.model";
import { AppError } from "../../errors/AppError";
import { USER_ROLE } from "../user/user.constant";
import { VendorModel } from "../vendor/vendor.model";
import { ProductModel } from "../product/product.model";
import { VENDOR_STATUS } from "../vendor/vendor.constant";
import { PRODUCT_STATUS } from "../product/product.constant";

const getPendingVendorRequest = async (page: number, limit: number) => {
  const skip = !page ? 0 : limit * page;
  const vendors = await VendorModel.find({ status: VENDOR_STATUS.PENDING })
    .populate("user")
    .skip(skip)
    .limit(limit);
  return vendors;
};

const updateVendorRequest = async (vendorId: string, status: string) => {
  const findVendor = await VendorModel.findById(vendorId);

  if (status === VENDOR_STATUS.CANECEL) {
    await VendorModel?.findByIdAndDelete(vendorId);
    return {
      cancel: true,
    };
  }

	await VendorModel.findByIdAndUpdate(vendorId, {
		status,
		commissionPercentage: 70,
	});

  await User.findOneAndUpdate(
    { _id: findVendor?.user },
    { vendor: findVendor?._id, role: USER_ROLE.VENDOR }
  );

  return {
    update: true,
  };
};

const updateVendorProfile = async (
  vendorId: string,
  body: { commissionPercentage: string }
) => {
  const update = await VendorModel.findByIdAndUpdate(vendorId, {
    commissionPercentage: body.commissionPercentage,
  });
  return update;
};

// product related function

const getPendingProducts = async (page: number, limit: number) => {
  const skip = !page ? 0 : limit * page;
  const products = await ProductModel.find({ status: PRODUCT_STATUS.PENDING })
    .populate({
      path: "vendor",
      populate: {
        path: "user",
      },
    })
    .skip(skip)
    .limit(limit);
  return products;
};

const updateProductStatus = async (
  productId: string,
  productStatus: (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS]
) => {
  const updateProduct = await ProductModel.findByIdAndUpdate(productId, {
    status: productStatus,
  });

  if (updateProduct) {
    const vendorId = updateProduct?.vendor;
    await VendorModel.findByIdAndUpdate(vendorId, {
      products: [updateProduct.id],
    });
  }
  return updateProduct;
};

const getApprovedVendor = async (userId: string) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const vendors = await VendorModel.find({ status: "Approved" }).populate(
    "user"
  );
  return vendors;
};

export const AdminServices = {
  getPendingVendorRequest,
  updateVendorRequest,
  updateVendorProfile,
  // product related function
  getPendingProducts,
  updateProductStatus,
  getApprovedVendor,
};

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllSetForAdmin = catchAsync(async (req, res) => {
    const allSet = await AdminServices.getAllSetForAdmin()
    sendResponse(res, {
      data: allSet,
      statusCode: httpStatus.OK,
      success: true,
      message: "get all set successful",
    });
  });
  const getSingleSetForAdmin = catchAsync(async (req, res) => {
    const { setId } = req.params;
    const set = await AdminServices.getSingleSetForAdmin(setId);
    sendResponse(res, {
      data: set,
      statusCode: httpStatus.OK,
      success: true,
      message: "set get successful",
    });
  });


export const AdminController = {
    getAllSetForAdmin,
    getSingleSetForAdmin
};

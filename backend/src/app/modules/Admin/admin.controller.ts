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

  const addSet = catchAsync(async (req, res) => {
    const { name, description } = req.body;
    const {setCreated } =
      await AdminServices.addSet(name, description);
    if (setCreated) {
      sendResponse(res, {
        data: setCreated,
        statusCode: httpStatus.CREATED,
        success: true,
        message: "set create successful",
      });
    }
  });

const updateSet = catchAsync(async (req,res)=> {
  const {setId} = req.params
  const {status} = req.body
  const {updated,setIncomplete} = await AdminServices.updateSet({setId,status})
  if(setIncomplete) {
    return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: true,
      error: 'Set is incomplete'
    })
  }
  if(!['publish','draft'].includes(status)) {
   return sendResponse(res, {
      statusCode: httpStatus.FORBIDDEN,
      success: true,
      error: 'wrong status'
    })
  }
  if(updated){
   return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: updated,
      message: 'updated successfull'
    })
  }
})
export const AdminController = {
    getAllSetForAdmin,
    getSingleSetForAdmin,
    addSet,
    updateSet
};

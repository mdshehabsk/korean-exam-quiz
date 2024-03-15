import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExamServices } from "./Exam.service";


const getAllSet = catchAsync(async (req,res)=> {
    const allSet = await ExamServices.getAllSet()
    return allSet
}) 

const getSingleSet = catchAsync(async (req,res)=> {
    const set = await ExamServices.getSingleSet('2')
    sendResponse(res, {
        data:set,
        statusCode: httpStatus.OK,
        success:true,
        message:'set get successful'
    })
})

export const ExamControllers = {
    getAllSet,
    getSingleSet
}
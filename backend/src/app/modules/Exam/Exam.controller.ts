import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExamServices } from "./Exam.service";
import { Express } from "express";
const getAllSet = catchAsync(async (req, res) => {
  const allSet = await ExamServices.getAllSet();
  sendResponse(res, {
    data: allSet,
    statusCode: httpStatus.OK,
    success: true,
    message: "get all set successful",
  });
});

const getSingleSet = catchAsync(async (req, res) => {
  const { setId } = req.params;
  const set = await ExamServices.getSingleSet(setId);
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
    await ExamServices.addSet(name, description);
  if (setCreated) {
    sendResponse(res, {
      data: setCreated,
      statusCode: httpStatus.CREATED,
      success: true,
      message: "set create successful",
    });
  }
});

const addQuestion = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  const body = req.body
  const {setId} = req.params
  const {setNotFound,faild,listeningBiggerThan20,readingIsBiggerThan20,saved} = await ExamServices.addQuestion({files,body,setId});
  if(listeningBiggerThan20) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_ACCEPTABLE,
      success: false,
      error : 'Already have 20 listening questions'
    })
  }
  if(readingIsBiggerThan20) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_ACCEPTABLE,
      success: false,
      error : 'Already have 20 reading questions',
    })
  }
  if(faild) {
   return sendResponse(res, {
      statusCode: httpStatus.NOT_IMPLEMENTED,
      success: false,
      error: 'Add question faild'
    })
  }
  if(setNotFound) {
  return  sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      error: 'Set not found'
    })
  }
  if(saved) {
    return sendResponse(res, {
      statusCode : httpStatus.CREATED,
      success: true,
      data: saved,
      message: 'Add question successfull',
    })
  }
});
const submitExam = catchAsync(async (req,res)=> {
  const body = req.body;
  const setId = req.params.setId

  await ExamServices.submitExam(setId,body)
})
export const ExamControllers = {
  getAllSet,
  getSingleSet,
  addSet,
  submitExam,
  addQuestion,
};

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
  const { nameNotFound, descriptionNotFound, setCreated } =
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

  console.log(req.body)
  // await ExamServices.addQuestion(req);

  
});

export const ExamControllers = {
  getAllSet,
  getSingleSet,
  addSet,

  addQuestion,
};

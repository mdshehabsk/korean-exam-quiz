import express from "express";
import { ExamControllers } from "./Exam.controller";
import multer from "multer";
import { validateBodyRequest, validateFilesRequest } from "../../middleware/validateRequest";
import { ExamValidations  } from "./Exam.validation";
const router = express.Router();

const upload = multer({});

router.get("/all-set", ExamControllers.getAllSet);

router.get("/set/:setId", ExamControllers.getSingleSet);

router.post("/create-set",validateBodyRequest(ExamValidations.CreateSetZodSchema), ExamControllers.addSet);



router.post(
  "/add-question/:setId",
  upload.any(),
  validateBodyRequest(ExamValidations.CreateQuestionZodSchema),
  validateFilesRequest(ExamValidations.CreateQuestionFileZodSchema),
  ExamControllers.addQuestion
);

router.post("/submit-exam/:setId", ExamControllers.submitExam);

export const ExamRoutes = router;

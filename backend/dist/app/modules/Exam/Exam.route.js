"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Exam_controller_1 = require("./Exam.controller");
const multer_1 = __importDefault(require("multer"));
const validateRequest_1 = require("../../middleware/validateRequest");
const Exam_validation_1 = require("./Exam.validation");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({});
router.get("/get-all-set", Exam_controller_1.ExamControllers.getAllSet);
router.get("/get-single-set/:setId", Exam_controller_1.ExamControllers.getSingleSet);
router.post("/add-question/:setId", upload.any(), (0, validateRequest_1.validateBodyRequest)(Exam_validation_1.ExamValidations.CreateQuestionZodSchema), (0, validateRequest_1.validateFilesRequest)(Exam_validation_1.ExamValidations.CreateQuestionFileZodSchema), Exam_controller_1.ExamControllers.addQuestion);
router.post("/submit-exam/:setId", Exam_controller_1.ExamControllers.submitExam);
exports.ExamRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Exam_controller_1 = require("./Exam.controller");
const router = express_1.default.Router();
router.get('/all-set');
router.get('/set/:id', Exam_controller_1.ExamControllers.getSingleSet);
exports.ExamRoutes = router;

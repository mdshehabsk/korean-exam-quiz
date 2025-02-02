"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const Exam_service_1 = require("./Exam.service");
const getAllSet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allSet = yield Exam_service_1.ExamServices.getAllSet();
    (0, sendResponse_1.default)(res, {
        data: allSet,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "get all set successful",
    });
}));
const getSingleSet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { setId } = req.params;
    const set = yield Exam_service_1.ExamServices.getSingleSet(setId);
    (0, sendResponse_1.default)(res, {
        data: set,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "set get successful",
    });
}));
const addQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const body = req.body;
    const { setId } = req.params;
    const { setNotFound, faild, listeningBiggerThan20, readingIsBiggerThan20, saved } = yield Exam_service_1.ExamServices.addQuestion({ files, body, setId });
    if (listeningBiggerThan20) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_ACCEPTABLE,
            success: false,
            error: 'Already have 20 listening questions'
        });
    }
    if (readingIsBiggerThan20) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_ACCEPTABLE,
            success: false,
            error: 'Already have 20 reading questions',
        });
    }
    if (faild) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_IMPLEMENTED,
            success: false,
            error: 'Add question faild'
        });
    }
    if (setNotFound) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            error: 'Set not found'
        });
    }
    if (saved) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            data: saved,
            message: 'Add question successfull',
        });
    }
}));
const submitExam = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { submitExamData } = req.body;
    const setId = req.params.setId;
    const { responseObj, setNotFound } = yield Exam_service_1.ExamServices.submitExam({ setId, submitExamData });
    if (setNotFound) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            error: 'set not found'
        });
    }
    if (responseObj) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: responseObj,
            message: 'get submited set result'
        });
    }
}));
exports.ExamControllers = {
    getAllSet,
    getSingleSet,
    submitExam,
    addQuestion,
};

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const Exam_model_1 = require("./Exam.model");
const addQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { setId } = req.params;
    const questionData = req.body;
    // Validate required fields (questionText and options)
    const validationErrors = validateQuestionData(questionData);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }
    const findSet = yield Exam_model_1.SetModel.findById(setId);
    if (!findSet) {
        return res.status(404).json({ message: "Set not found" });
    }
    const { questionType, optionsType } = questionData, rest = __rest(questionData, ["questionType", "optionsType"]);
    const nextQuestionNumber = yield getNextQuestionNumber(findSet, questionType);
    const questionObject = buildQuestionObject(nextQuestionNumber, questionType, optionsType, rest, req.files);
    findSet.questions.push(questionObject);
    yield findSet.save();
    res.status(201).json({ message: "Question added successfully" });
}));
function validateQuestionData(data) {
    const errors = [];
    if (!data.questionText) {
        errors.push("Question text is required");
    }
    if (data.optionsType === "text") {
        if (!data.option1 || !data.option2 || !data.option3 || !data.option4) {
            errors.push("All options are required for text type");
        }
    }
    return errors;
}
function getNextQuestionNumber(set, questionType) {
    return __awaiter(this, void 0, void 0, function* () {
        const filteredQuestions = set.questions.filter((q) => q.questionType === questionType);
        if (filteredQuestions.length > 0) {
            return filteredQuestions[filteredQuestions.length - 1].questionId + 1;
        }
        else {
            if (questionType === "Reading") {
                return 1;
            }
            else if (questionType === "Listening") {
                return 21;
            }
            else {
                // Handle other cases if necessary
                return 1;
            }
        }
    });
}
function buildQuestionObject(questionId, questionType, optionsType, questionData, files) {
    const question = { type: questionType, value: questionData.questionText };
    const options = [];
    if (optionsType === "text") {
        options.push({ type: optionsType, value: questionData.option1 }, { type: optionsType, value: questionData.option2 }, { type: optionsType, value: questionData.option3 }, { type: optionsType, value: questionData.option4 });
    }
    else if (optionsType === "file") {
        const filePaths = handleOptionFiles(files);
        options.push({ type: getFileType(files.option1), value: filePaths[0] }, { type: getFileType(files.option2), value: filePaths[1] }, { type: getFileType(files.option3), value: filePaths[2] }, { type: getFileType(files.option4), value: filePaths[3] });
    }
    const questionFile = handleQuestionFile(files);
    question.value = questionFile
        ? questionFile
        : questionData.questionText; // Use uploaded file path if available
    return {
        questionId,
        titleQuestion: questionData.titleQuestion,
        questionType,
        question,
        options,
        answer: 1, // Assuming answer is always the first option for now
    };
}
function handleQuestionFile(files) {
    if (files === null || files === void 0 ? void 0 : files.question) {
        const fileName = `${questionDirectory}/question.jpg`;
        // Implement file writing logic here (similar to existing code)
        return fileName;
    }
    return null;
}
function handleOptionFiles(files) {
    const filePaths = [];
    for (let i = 0; i < [files.option1, files.option2, files.option3, files.option4].length; i++) {
        const optionFile = files[`option${i + 1}`]; // Access files using template literal
        if (optionFile) {
            const fileName = `${questionDirectory}/${i + 1}.jpg`;
            // Implement file writing logic here (similar to existing code)
            filePaths.push(fileName);
        }
    }
    return filePaths;
}
function getFileType(file) {
    if (file && file.mimetype.startsWith('image')) {
        return 'image';
    }
    else if (file) {
        return 'audio'; // Assuming other files are audio for now
    }
    return null; // Handle case where no file is provided
}

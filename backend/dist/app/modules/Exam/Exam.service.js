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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamServices = void 0;
const Exam_model_1 = require("./Exam.model");
const cloudinary_file_upload_service_1 = require("../Cloudinary/cloudinary.file.upload.service");
const getAllSet = () => __awaiter(void 0, void 0, void 0, function* () {
    const allSet = yield Exam_model_1.SetModel.find({ status: 'publish' }).select('-questions');
    return allSet;
});
const getSingleSet = (setId) => __awaiter(void 0, void 0, void 0, function* () {
    const findSet = yield Exam_model_1.SetModel.findOne({ _id: setId, status: 'publish' }).select('-questions.answer');
    return findSet;
});
// const addQuestion = async (req: Request) => {
//   const { setId } = req.params;
//   // data from req.body
//   const {
//     addQuestionType,
//     questionType,
//     titleQuestion,
//     optionsType,
//     question: questionText,
//     answer,
//   } = req.body;
//   const optionOneText = req.body?.option1;
//   const optionTwoText = req.body?.option2;
//   const optionThreeText = req.body.option3;
//   const optionFourText = req.body?.option4;
//   // data from req.files
//   const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//   const questionFile = files?.question?.[0];
//   const optionsFile = [
//     files?.option1?.[0],
//     files?.option2?.[0],
//     files?.option3?.[0],
//     files?.option4?.[0],
//   ];
//   const findSet = await SetModel.findById(setId);
//   const nextQuestionNumber = await getNextQuestionNumber(
//     findSet,
//     addQuestionType
//   );
//   if (addQuestionType === "Reading" && nextQuestionNumber >= 21) {
//     return {
//       readingMoreThan20: true,
//     };
//   }
//   if (addQuestionType === "Listening" && nextQuestionNumber >= 41) {
//     return {
//       listeningMoreThan20: true,
//     };
//   }
//   const setDirectory = `uploads/${findSet?.name}`;
//   if (questionType === "text" && optionsType === "text") {
//     findSet?.questions.push({
//       questionId: nextQuestionNumber,
//       titleQuestion,
//       questionType: addQuestionType,
//       question: {
//         type: questionType as string,
//         value: questionText as string,
//       },
//       options: [
//         { type: optionsType, value: optionOneText, id: 1 },
//         { type: optionsType, value: optionTwoText, id: 2 },
//         { type: optionsType, value: optionThreeText, id: 3 },
//         { type: optionsType, value: optionFourText, id: 4 },
//       ],
//       answer,
//     });
//     const saved = await findSet?.save();
//     return {
//       saved,
//     };
//   }
//   if (questionType === "text" && optionsType === "file") {
//     const setPath = `${setDirectory}`;
//     const questionDirectory = `${setPath}/${nextQuestionNumber}`;
//     // Ensure the set directory exists
//     if (!fs.existsSync(setPath)) {
//       fs.mkdirSync(setPath, { recursive: true }); // Create the set directory recursively
//     }
//     // Ensure the question directory exists
//     if (!fs.existsSync(questionDirectory)) {
//       fs.mkdirSync(questionDirectory); // Create the question directory
//     }
//     const filePaths = [];
//     // Write files to the question directory
//     for (let i = 0; i < optionsFile.length; i++) {
//       const extension = optionsFile[i].originalname.split(".").pop();
//       const fileName = `${questionDirectory}/${i + 1}.${extension}`;
//       fs.writeFileSync(fileName, optionsFile[i].buffer);
//       filePaths.push(fileName);
//     }
//     const fileType = optionsFile[0].mimetype.startsWith("image")
//       ? "image"
//       : "audio";
//     findSet?.questions?.push({
//       questionId: nextQuestionNumber,
//       titleQuestion,
//       questionType: addQuestionType,
//       question: {
//         type: questionType as string,
//         value: questionText as string,
//       },
//       options: [
//         { type: fileType, value: filePaths[0], id: 1 },
//         { type: fileType, value: filePaths[1], id: 2 },
//         { type: fileType, value: filePaths[2], id: 3 },
//         { type: fileType, value: filePaths[3], id: 4 },
//       ],
//       answer: 1,
//     });
//     const saved = await findSet?.save();
//     return saved;
//   }
//   if (questionType === "file" && optionsType === "text") {
//     const setPath = `${setDirectory}`;
//     const questionDirectory = `${setPath}/${nextQuestionNumber}`;
//     // Ensure the set directory exists
//     if (!fs.existsSync(setPath)) {
//       fs.mkdirSync(setPath, { recursive: true }); // Create the set directory recursively
//     }
//     // Ensure the question directory exists
//     if (!fs.existsSync(questionDirectory)) {
//       fs.mkdirSync(questionDirectory); // Create the question directory
//     }
//     const extension = questionFile?.originalname.split(".").pop();
//     const questionFileName = `${questionDirectory}/question.${extension}`;
//     fs.writeFileSync(questionFileName, questionFile.buffer);
//     const fileType = questionFile.mimetype.startsWith("image")
//       ? "image"
//       : "audio";
//     findSet?.questions?.push({
//       questionId: nextQuestionNumber,
//       titleQuestion,
//       questionType: addQuestionType,
//       question: {
//         type: fileType,
//         value: questionFileName,
//       },
//       options: [
//         { type: optionsType, value: optionOneText, id: 1 },
//         { type: optionsType, value: optionTwoText, id: 2 },
//         { type: optionsType, value: optionThreeText, id: 3 },
//         { type: optionsType, value: optionFourText, id: 4 },
//       ],
//       answer,
//     });
//     const saved = await findSet?.save();
//     return {
//       saved,
//     };
//   }
//   if (questionType === "file" && optionsType === "file") {
//     const setPath = `${setDirectory}`;
//     const questionDirectory = `${setPath}/${nextQuestionNumber}`;
//     // Ensure the set directory exists
//     if (!fs.existsSync(setPath)) {
//       fs.mkdirSync(setPath, { recursive: true }); // Create the set directory recursively
//     }
//     // Ensure the question directory exists
//     if (!fs.existsSync(questionDirectory)) {
//       fs.mkdirSync(questionDirectory); // Create the question directory
//     }
//     const filePaths = [];
//     // Write files to the question directory
//     for (let i = 0; i < optionsFile.length; i++) {
//       const extension = optionsFile[i].originalname.split(".").pop();
//       const fileName = `${questionDirectory}/${i + 1}.${extension}`;
//       fs.writeFileSync(fileName, optionsFile[i].buffer);
//       filePaths.push(fileName);
//     }
//     const questionExtension = questionFile.originalname.split(".").pop();
//     const questionFileName = `${questionDirectory}/question.${questionExtension}`;
//     fs.writeFileSync(questionFileName, questionFile.buffer);
//     const fileType = optionsFile[0].mimetype.startsWith("image")
//       ? "image"
//       : "audio";
//     findSet?.questions?.push({
//       questionId: nextQuestionNumber,
//       titleQuestion,
//       questionType: addQuestionType,
//       question: {
//         type: questionType as string,
//         value: questionFileName as string,
//       },
//       options: [
//         { type: fileType, value: filePaths[0], id: 1 },
//         { type: fileType, value: filePaths[1], id: 2 },
//         { type: fileType, value: filePaths[2], id: 3 },
//         { type: fileType, value: filePaths[3], id: 4 },
//       ],
//       answer: 1,
//     });
//     const saved = await findSet?.save();
//     return {
//       saved,
//     };
//   }
// };
const mapTyped = {
    image: "file",
    audio: "file",
    text: "text",
};
const addQuestion = (_a) => __awaiter(void 0, [_a], void 0, function* ({ body, files, setId, }) {
    var _b, _c;
    const descriptionFile = files === null || files === void 0 ? void 0 : files.filter((file) => file.fieldname === "description");
    const optionsFiles = files === null || files === void 0 ? void 0 : files.filter((file) => file.fieldname === "options");
    const foundSet = yield Exam_model_1.SetModel.findOne({ _id: setId });
    if (!foundSet) {
        return {
            setNotFound: true,
        };
    }
    const readingQuestions = (_b = foundSet === null || foundSet === void 0 ? void 0 : foundSet.questions) === null || _b === void 0 ? void 0 : _b.filter(item => item.type === 'reading');
    const listeningQuestions = (_c = foundSet === null || foundSet === void 0 ? void 0 : foundSet.questions) === null || _c === void 0 ? void 0 : _c.filter(item => item.type === 'listening');
    if ((body === null || body === void 0 ? void 0 : body.type) === 'reading' && readingQuestions.length >= 20) {
        return {
            readingIsBiggerThan20: true
        };
    }
    if ((body === null || body === void 0 ? void 0 : body.type) === 'listening' && listeningQuestions.length >= 20) {
        return {
            listeningBiggerThan20: true
        };
    }
    if (mapTyped[body === null || body === void 0 ? void 0 : body.descriptionType] === "file" &&
        mapTyped[body === null || body === void 0 ? void 0 : body.optionsType] === "text") {
        const uploadedDescriptionFile = yield (0, cloudinary_file_upload_service_1.cloudinaryFileUpload)(descriptionFile, "korean/question");
        const descriptionURL = uploadedDescriptionFile === null || uploadedDescriptionFile === void 0 ? void 0 : uploadedDescriptionFile.map((item) => item.url);
        foundSet.questions.push({
            title: body.title,
            answer: Number(body.answer),
            descriptionType: body === null || body === void 0 ? void 0 : body.descriptionType,
            optionsType: body === null || body === void 0 ? void 0 : body.optionsType,
            type: body === null || body === void 0 ? void 0 : body.type,
            description: descriptionURL === null || descriptionURL === void 0 ? void 0 : descriptionURL[0],
            options: JSON.parse(body === null || body === void 0 ? void 0 : body.options),
        });
        const saved = yield foundSet.save();
        return {
            saved,
        };
    }
    if (mapTyped[body === null || body === void 0 ? void 0 : body.descriptionType] === "file" &&
        mapTyped[body === null || body === void 0 ? void 0 : body.optionsType] === "file") {
        const uploadedDescriptionFile = yield (0, cloudinary_file_upload_service_1.cloudinaryFileUpload)(descriptionFile, "korean/question");
        const uploadedOptionsFile = yield (0, cloudinary_file_upload_service_1.cloudinaryFileUpload)(optionsFiles, "korean/question");
        const descriptionURL = uploadedDescriptionFile === null || uploadedDescriptionFile === void 0 ? void 0 : uploadedDescriptionFile.map((item) => item.url);
        const optionsURL = uploadedOptionsFile === null || uploadedOptionsFile === void 0 ? void 0 : uploadedOptionsFile.map((item) => item.url);
        foundSet.questions.push({
            title: body.title,
            answer: Number(body.answer),
            descriptionType: body === null || body === void 0 ? void 0 : body.descriptionType,
            optionsType: body === null || body === void 0 ? void 0 : body.optionsType,
            type: body === null || body === void 0 ? void 0 : body.type,
            description: descriptionURL === null || descriptionURL === void 0 ? void 0 : descriptionURL[0],
            options: optionsURL,
        });
        const saved = yield foundSet.save();
        return {
            saved,
        };
    }
    if (mapTyped[body === null || body === void 0 ? void 0 : body.descriptionType] === "text" &&
        mapTyped[body === null || body === void 0 ? void 0 : body.optionsType] === "file") {
        const uploadedOptionsFile = yield (0, cloudinary_file_upload_service_1.cloudinaryFileUpload)(optionsFiles, "korean/question");
        const optionsURL = uploadedOptionsFile === null || uploadedOptionsFile === void 0 ? void 0 : uploadedOptionsFile.map((item) => item.url);
        foundSet.questions.push({
            title: body.title,
            answer: Number(body.answer),
            descriptionType: body === null || body === void 0 ? void 0 : body.descriptionType,
            optionsType: body === null || body === void 0 ? void 0 : body.optionsType,
            type: body === null || body === void 0 ? void 0 : body.type,
            description: body === null || body === void 0 ? void 0 : body.description,
            options: optionsURL,
        });
        const saved = yield foundSet.save();
        return {
            saved,
        };
    }
    if (mapTyped[body === null || body === void 0 ? void 0 : body.descriptionType] === 'text' && mapTyped[body === null || body === void 0 ? void 0 : body.optionsType] === 'text') {
        foundSet.questions.push({
            title: body.title,
            answer: Number(body.answer),
            descriptionType: body === null || body === void 0 ? void 0 : body.descriptionType,
            optionsType: body === null || body === void 0 ? void 0 : body.optionsType,
            type: body === null || body === void 0 ? void 0 : body.type,
            description: body === null || body === void 0 ? void 0 : body.description,
            options: JSON.parse(body === null || body === void 0 ? void 0 : body.options),
        });
        const saved = yield foundSet.save();
        return {
            saved,
        };
    }
    return {
        faild: true,
    };
});
const submitExam = (_d) => __awaiter(void 0, [_d], void 0, function* ({ setId, submitExamData }) {
    var _e, _f;
    const findSet = yield Exam_model_1.SetModel.findById(setId).lean();
    if (!findSet) {
        return {
            setNotFound: true
        };
    }
    const returnSubmitedSet = {
        name: findSet.name,
        description: findSet.description,
        _id: findSet === null || findSet === void 0 ? void 0 : findSet._id,
        status: findSet === null || findSet === void 0 ? void 0 : findSet.status,
        questions: (_e = findSet === null || findSet === void 0 ? void 0 : findSet.questions) === null || _e === void 0 ? void 0 : _e.map(question => {
            return Object.assign(Object.assign({}, question), { selected: submitExamData[question === null || question === void 0 ? void 0 : question._id] });
        })
    };
    const correctAnswers = ((_f = returnSubmitedSet.questions) === null || _f === void 0 ? void 0 : _f.filter(question => question.selected === Number(question.answer)).length) || 0;
    const totalScore = correctAnswers * 2.5;
    const responseObj = {
        returnSubmitedSet,
        correctAnswers,
        totalScore
    };
    return {
        responseObj
    };
});
exports.ExamServices = {
    getAllSet,
    getSingleSet,
    submitExam,
    addQuestion,
};

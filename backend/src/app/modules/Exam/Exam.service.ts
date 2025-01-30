import { Express } from "express";
import {ISetQuestion } from "./Exam.interface";
import { SetModel } from "./Exam.model";
import { cloudinaryFileUpload } from "../Cloudinary/cloudinary.file.upload.service";

const getAllSet = async () => {
  const allSet = await SetModel.find({status: 'publish'}).select('-questions');
  return allSet;
};

const getSingleSet = async (setId: string) => {
  const findSet = await SetModel.findOne({_id: setId, status : 'publish'}).select('-answer');
  return findSet;
};

const addSet = async (name: string, description: string) => {
  const setCreated = await SetModel.create({
    description,
    name,
  });
  return {
    setCreated,
  };
};


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

const mapTyped: Record<string, string> = {
  image: "file",
  audio: "file",
  text: "text",
};

const addQuestion = async ({
  body,
  files,
  setId,
}: {
  files: Express.Multer.File[];
  body: ISetQuestion;
  setId: string;
}) => {
  const descriptionFile = files?.filter(
    (file) => file.fieldname === "description"
  );
  const optionsFiles = files?.filter((file) => file.fieldname === "options");
  const foundSet = await SetModel.findOne({ _id: setId });
  if (!foundSet) {
    return {
      setNotFound: true,
    };
  }
  const readingQuestions = foundSet?.questions?.filter(item => item.type === 'reading')
  const listeningQuestions = foundSet?.questions?.filter(item => item.type === 'listening')

  if(body?.type === 'reading' && readingQuestions.length >= 20) {
    return {
      readingIsBiggerThan20 : true
    }
  }
  if(body?.type === 'listening' && listeningQuestions.length >= 20){
    return {
      listeningBiggerThan20: true
    }
  }
  if (
    mapTyped[body?.descriptionType] === "file" &&
    mapTyped[body?.optionsType] === "text"
  ) {
    const uploadedDescriptionFile = await cloudinaryFileUpload(
      descriptionFile,
      "korean/question",
    );
    const descriptionURL = uploadedDescriptionFile?.map((item) => item.url);

    foundSet.questions.push({
      title: body.title,
      answer: Number(body.answer),
      descriptionType: body?.descriptionType,
      optionsType: body?.optionsType,
      type: body?.type,
      description: descriptionURL?.[0],
      options: JSON.parse(body?.options as unknown as string),
    });
    const saved = await foundSet.save();
    return {
      saved,
    };
  }
  if (
    mapTyped[body?.descriptionType] === "file" &&
    mapTyped[body?.optionsType] === "file"
  ) {
    const uploadedDescriptionFile = await cloudinaryFileUpload(
      descriptionFile,
      "korean/question"
    );
    const uploadedOptionsFile = await cloudinaryFileUpload(
      optionsFiles,
      "korean/question"
    );
    const descriptionURL = uploadedDescriptionFile?.map((item) => item.url);
    const optionsURL = uploadedOptionsFile?.map((item) => item.url);
    foundSet.questions.push({
      title: body.title,
      answer: Number(body.answer),
      descriptionType: body?.descriptionType,
      optionsType: body?.optionsType,
      type: body?.type,
      description: descriptionURL?.[0],
      options: optionsURL,
    });
    const saved = await foundSet.save();
    return {
      saved,
    };
  }
  if (
    mapTyped[body?.descriptionType] === "text" &&
    mapTyped[body?.optionsType] === "file"
  ) {
    const uploadedOptionsFile = await cloudinaryFileUpload(
      optionsFiles,
      "korean/question"
    );
    const optionsURL = uploadedOptionsFile?.map((item) => item.url);

    foundSet.questions.push({
      title: body.title,
      answer: Number(body.answer),
      descriptionType: body?.descriptionType,
      optionsType: body?.optionsType,
      type: body?.type,
      description: body?.description,
      options: optionsURL,
    });
    const saved = await foundSet.save();
    return {
      saved,
    };
  }
  if(mapTyped[body?.descriptionType] === 'text' && mapTyped[body?.optionsType] === 'text' ){

    foundSet.questions.push({
      title: body.title,
      answer: Number(body.answer),
      descriptionType: body?.descriptionType,
      optionsType: body?.optionsType,
      type: body?.type,
      description: body?.description,
      options: JSON.parse(body?.options as unknown as string),
    });
    const saved = await foundSet.save();
    return {
      saved,
    };
  }
  return {
    faild: true,
  };
};

const submitExam = async () => {};

export const ExamServices = {
  getAllSet,
  getSingleSet,
  submitExam,
  addQuestion,
  addSet,
};

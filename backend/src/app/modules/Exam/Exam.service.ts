import { Request } from "express";
import { ISet, ISetQuestion } from "./Exam.interface";
import { SetModel } from "./Exam.model";
import fs from "fs";
import mongoose from "mongoose";

const getAllSet = async () => {
  const allSet = await SetModel.find();
  return allSet;
};

const getSingleSet = async (setId: string) => {
  const findSet = await SetModel.findById(setId);
  return findSet;
};

const addSet = async (name: string, description: string) => {
  if (!name) {
    return {
      nameNotFound: true,
    };
  }
  if (!description) {
    return {
      descriptionNotFound: true,
    };
  }
  const setCreated = await SetModel.create({
    description,
    name,
  });
  return {
    setCreated,
  };
};
async function getNextQuestionNumber(set: ISet | null, questionType: string) {
  const filteredQuestions = set?.questions.filter(
    (q) => q.questionType === questionType
  ) as ISetQuestion[];

  if (filteredQuestions.length > 0) {
    return filteredQuestions[filteredQuestions.length - 1].questionId + 1;
  } else {
    if (questionType === "Reading") {
      return 1;
    } else if (questionType === "Listening") {
      return 21;
    } else {
      // Handle other cases if necessary
      return 1;
    }
  }
}

const addQuestion = async (req: Request) => {
  const { setId } = req.params;

  // data from req.body
  const {
    addQuestionType,
    questionType,
    titleQuestion,
    optionsType,
    question: questionText,
    answer,
  } = req.body;

  const optionOneText = req.body?.option1;
  const optionTwoText = req.body?.option2;
  const optionThreeText = req.body.option3;
  const optionFourText = req.body?.option4;

  // data from req.files
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const questionFile = files?.question?.[0];

  const optionsFile = [
    files?.option1?.[0],
    files?.option2?.[0],
    files?.option3?.[0],
    files?.option4?.[0],
  ];

  const findSet = await SetModel.findById(setId);
  const nextQuestionNumber = await getNextQuestionNumber(
    findSet,
    addQuestionType
  );
  if (addQuestionType === "Reading" && nextQuestionNumber >= 21) {
    return {
      readingMoreThan20: true,
    };
  }
  if (addQuestionType === "Listening" && nextQuestionNumber >= 41) {
    return {
      listeningMoreThan20: true,
    };
  }
  const setDirectory = `uploads/${findSet?.name}`;
  if (questionType === "text" && optionsType === "text") {
    findSet?.questions.push({
      questionId: nextQuestionNumber,
      titleQuestion,
      questionType: addQuestionType,
      question: {
        type: questionType as string,
        value: questionText as string,
      },
      options: [
        { type: optionsType, value: optionOneText, id: 1 },
        { type: optionsType, value: optionTwoText, id: 2 },
        { type: optionsType, value: optionThreeText, id: 3 },
        { type: optionsType, value: optionFourText, id: 4 },
      ],
      answer,
    });
    const saved = await findSet?.save();
    return {
      saved,
    };
  }

  if (questionType === "text" && optionsType === "file") {
    const setPath = `${setDirectory}`;
    const questionDirectory = `${setPath}/${nextQuestionNumber}`;

    // Ensure the set directory exists
    if (!fs.existsSync(setPath)) {
      fs.mkdirSync(setPath, { recursive: true }); // Create the set directory recursively
    }

    // Ensure the question directory exists
    if (!fs.existsSync(questionDirectory)) {
      fs.mkdirSync(questionDirectory); // Create the question directory
    }

    const filePaths = [];

    // Write files to the question directory
    for (let i = 0; i < optionsFile.length; i++) {
      const extension = optionsFile[i].originalname.split(".").pop();
      const fileName = `${questionDirectory}/${i + 1}.${extension}`;
      fs.writeFileSync(fileName, optionsFile[i].buffer);
      filePaths.push(fileName);
    }

    const fileType = optionsFile[0].mimetype.startsWith("image")
      ? "image"
      : "audio";
    findSet?.questions?.push({
      questionId: nextQuestionNumber,
      titleQuestion,
      questionType: addQuestionType,
      question: {
        type: questionType as string,
        value: questionText as string,
      },
      options: [
        { type: fileType, value: filePaths[0], id: 1 },
        { type: fileType, value: filePaths[1], id: 2 },
        { type: fileType, value: filePaths[2], id: 3 },
        { type: fileType, value: filePaths[3], id: 4 },
      ],
      answer: 1,
    });
    const saved = await findSet?.save();
    return saved;
  }
  if (questionType === "file" && optionsType === "text") {
    const setPath = `${setDirectory}`;
    const questionDirectory = `${setPath}/${nextQuestionNumber}`;

    // Ensure the set directory exists
    if (!fs.existsSync(setPath)) {
      fs.mkdirSync(setPath, { recursive: true }); // Create the set directory recursively
    }

    // Ensure the question directory exists
    if (!fs.existsSync(questionDirectory)) {
      fs.mkdirSync(questionDirectory); // Create the question directory
    }
    const extension = questionFile?.originalname.split(".").pop();
    const questionFileName = `${questionDirectory}/question.${extension}`;
    fs.writeFileSync(questionFileName, questionFile.buffer);

    const fileType = questionFile.mimetype.startsWith("image")
      ? "image"
      : "audio";
    findSet?.questions?.push({
      questionId: nextQuestionNumber,
      titleQuestion,
      questionType: addQuestionType,
      question: {
        type: fileType,
        value: questionFileName,
      },
      options: [
        { type: optionsType, value: optionOneText, id: 1 },
        { type: optionsType, value: optionTwoText, id: 2 },
        { type: optionsType, value: optionThreeText, id: 3 },
        { type: optionsType, value: optionFourText, id: 4 },
      ],
      answer,
    });

    const saved = await findSet?.save();

    return {
      saved,
    };
  }
  if (questionType === "file" && optionsType === "file") {
    const setPath = `${setDirectory}`;
    const questionDirectory = `${setPath}/${nextQuestionNumber}`;

    // Ensure the set directory exists
    if (!fs.existsSync(setPath)) {
      fs.mkdirSync(setPath, { recursive: true }); // Create the set directory recursively
    }
    // Ensure the question directory exists
    if (!fs.existsSync(questionDirectory)) {
      fs.mkdirSync(questionDirectory); // Create the question directory
    }

    const filePaths = [];

    // Write files to the question directory
    for (let i = 0; i < optionsFile.length; i++) {
      const extension = optionsFile[i].originalname.split(".").pop();
      const fileName = `${questionDirectory}/${i + 1}.${extension}`;
      fs.writeFileSync(fileName, optionsFile[i].buffer);
      filePaths.push(fileName);
    }
    const questionExtension = questionFile.originalname.split(".").pop();
    const questionFileName = `${questionDirectory}/question.${questionExtension}`;
    fs.writeFileSync(questionFileName, questionFile.buffer);
    const fileType = optionsFile[0].mimetype.startsWith("image")
      ? "image"
      : "audio";
    findSet?.questions?.push({
      questionId: nextQuestionNumber,
      titleQuestion,
      questionType: addQuestionType,
      question: {
        type: questionType as string,
        value: questionFileName as string,
      },
      options: [
        { type: fileType, value: filePaths[0], id: 1 },
        { type: fileType, value: filePaths[1], id: 2 },
        { type: fileType, value: filePaths[2], id: 3 },
        { type: fileType, value: filePaths[3], id: 4 },
      ],
      answer: 1,
    });
    const saved = await findSet?.save();

    return {
      saved,
    };
  }
};

const submitExam = async (
  setId: string,
  examData: { questionId: number; optionId: number }[]
) => {
  const set = await SetModel.findById(setId).populate({
    path: 'questions.answer',
    select: 'answer'
});
  if (!set) {
      throw new Error(`Set with ID ${setId} not found`);
  }


  // Calculate points
  let totalPoints = 0;
  set.questions.forEach(question => {
      const matchingExamData = examData.find(data => data.questionId === question.questionId);
      if (matchingExamData && matchingExamData.optionId == question.answer) {
          totalPoints += 2.5;
      }
  });
  console.log(totalPoints)
};

export const ExamServices = {
  getAllSet,
  getSingleSet,
  submitExam,
  addQuestion,
  addSet,
};

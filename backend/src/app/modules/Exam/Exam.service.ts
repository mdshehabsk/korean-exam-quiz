
import { Request } from "express";
import { ISet, ISetQuestion } from "./Exam.interface";
import { SetModel } from "./Exam.model";
import fs from 'fs'
import path from 'path'

const myExam = {
    id:1,
    name: "Sample Exam",
    description: "This is a sample exam.",
    questions: [
        {
            type:'reading',
            id:1,
            question: "Reading Question 1",
            answer: 1,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
        {
            type:'reading',
            id:2,
            question: "Reading Question 2",
            answer: 2,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
        {
            type:'listening',
            id:3,
            question: "Listening Question 1",
            answer: 1,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
        {
            type:'listening',
            id:4,
            question: "Listening Question 2",
            answer: 2,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
    ],

};

const getAllSet = async () => {
    const allSet = await SetModel.find()
    return allSet
}

const getSingleSet = async (setId:string) => {
    const findSet = await SetModel.findById(setId)
    return findSet
}

const addSet = async (name:string,description:string) => {
    if(!name){
        return {
            nameNotFound:true
        }
    }
    if(!description){
        return {
            descriptionNotFound:true
        }
    }
    const setCreated = await SetModel.create({
        description,
        name,
    })
    return {
        setCreated
    }
}
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

const addQuestion = async (req:Request) => {
    const { setId } = req.params;

    // data from req.body
    const {
      addQuestionType,
      questionType,
      titleQuestion,
      optionsType,
      question: questionText,
    } = req.body;
  
    const optionOneText = req.body?.option1 ;
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
  
    const findSet = await SetModel.findById(setId) ;
    const nextQuestionNumber = await getNextQuestionNumber(findSet,addQuestionType)
    if(addQuestionType === 'Reading' && nextQuestionNumber >= 21) {
        return {
            readingMoreThan20:true
        }
    }
    if(addQuestionType === 'Listening' && nextQuestionNumber >= 41) {
        return {
            listeningMoreThan20: true
        }
    }
    const setDirectory = `uploads/${findSet?.name}`;
    if (questionType === "text" && optionsType === "text") {
      findSet?.questions.push({
        questionId: nextQuestionNumber ,
        titleQuestion,
        questionType: addQuestionType,
        question: {
          type: questionType as string,
          value: questionText as string,
        },
        options: [
          { type: optionsType, value: optionOneText },
          { type: optionsType, value: optionTwoText },
          { type: optionsType, value: optionThreeText },
          { type: optionsType, value: optionFourText },
        ],
        answer: 1,
      });
      const saved =  await findSet?.save();

      return {
        saved
      }
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
        const extension =  optionsFile[i].originalname.split('.').pop()
        const fileName = `${questionDirectory}/${i + 1}.${extension}`;
        fs.writeFileSync(fileName, optionsFile[i].buffer);
        filePaths.push(fileName);
      }
  
      const fileType = optionsFile[0].mimetype.startsWith('image') ? 'image' : 'audio';
      findSet?.questions?.push({
        questionId: nextQuestionNumber ,
        titleQuestion,
        questionType:addQuestionType,
        question:{
          type:questionType as string,
          value:questionText as string
        },
        options:[{type:fileType,value: filePaths[0] },{type:fileType,value: filePaths[1] },{type:fileType,value: filePaths[2] },{type:fileType,value: filePaths[3] }],
        answer:1
      })
      const saved =  await findSet?.save();
      return saved
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
      const extension = questionFile?.originalname.split('.').pop()
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
          { type: optionsType, value: optionOneText },
          { type: optionsType, value: optionTwoText },
          { type: optionsType, value: optionThreeText },
          { type: optionsType, value: optionFourText },
        ],
        answer: 1,
      });
  
      const saved =  await findSet?.save();

      return {
        saved
      }
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
        const extension =  optionsFile[i].originalname.split('.').pop()
        const fileName = `${questionDirectory}/${i + 1}.${extension}`;
        fs.writeFileSync(fileName, optionsFile[i].buffer);
        filePaths.push(fileName);
      }
      const questionExtension = questionFile.originalname.split('.').pop()
      const questionFileName = `${questionDirectory}/question.${questionExtension}`;
      fs.writeFileSync(questionFileName, questionFile.buffer);
      const fileType = optionsFile[0].mimetype.startsWith('image') ? 'image' : 'audio';
      findSet?.questions?.push({
        questionId:nextQuestionNumber,
        titleQuestion,
        questionType:addQuestionType,
        question:{
          type:questionType as string,
          value:questionFileName as string
        },
        options:[{type:fileType,value: filePaths[0] },{type:fileType,value: filePaths[1] },{type:fileType,value: filePaths[2] },{type:fileType,value: filePaths[3] }],
        answer:1
      })
      const saved =  await findSet?.save();

      return {
        saved
      }
    }
}




export const ExamServices = {
    getAllSet,
    getSingleSet,

    addQuestion,
    addSet
}
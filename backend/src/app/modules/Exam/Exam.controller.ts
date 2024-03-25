import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExamServices } from "./Exam.service";
import { Express } from "express";
import fs from 'fs'
import path from 'path'
import { SetModel } from "./Exam.model";
const getAllSet = catchAsync(async (req,res)=> {
    const allSet = await ExamServices.getAllSet()
    sendResponse(res, {
        data:allSet,
        statusCode:httpStatus.OK,
        success:true,
        message:'get all set successful'
    })
}) 

const getSingleSet = catchAsync(async (req,res)=> {
    const set = await ExamServices.getSingleSet('2')
    sendResponse(res, {
        data:set,
        statusCode: httpStatus.OK,
        success:true,
        message:'set get successful'
    })
})


const addSet = catchAsync(async (req,res) => {
    const {name,description} = req.body;
    const {nameNotFound,descriptionNotFound,setCreated} = await ExamServices.addSet(name,description)
    if(setCreated){
        sendResponse(res, {
            data:setCreated,
            statusCode: httpStatus.CREATED,
            success:true,
            message:'set create successful'
        })
    }
})


const addQuestion = catchAsync(async (req,res) => {
    const errors = {} as any ;
    const {setId} = req.params

    // data from req.body
    const {addQuestionType,questionType,titleQuestion,optionsType,question : questionText} = req.body
    
    const optionOneText = req.body?.option1 as string
    const optionTwoText = req.body?.option2
    const optionThreeText = req.body.option3
    const optionFourText = req.body?.option4

    // data from req.files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const questionFile =  files?.question?.[0]
    const optionOneFile = files?.option1?.[0];
    const optionTwoFile = files?.option2?.[0];
    const optionThreeFile = files?.option3?.[0];
    const optionFourFile = files?.option4?.[0];
    const optionsFile = [files?.option1?.[0],files?.option2?.[0],files?.option3?.[0],files?.option4?.[0]]

    const findSet = await SetModel.findById(setId)
    const uploadPath = `uploads`
    if(questionType === 'text' && optionsType === 'text'){
        findSet?.questions.push({
          questionType:addQuestionType,
          question:{
            type:questionType as string,
            value:questionText as string
          },
          options:[{type:optionsType,value:optionOneText},{type:optionsType,value:optionTwoText},{type:optionsType,value:optionThreeText},{type:optionsType,value:optionFourText}],
          answer:1
        })
      await findSet?.save()
    }
    if(questionType === 'text' && optionsType === 'file') {
      const upload = []
      const findPath = fs.existsSync(`uploads/${findSet?.name}`)
      if(!findPath){
        fs.mkdirSync(`${uploadPath}/${findSet?.name}`)
      }
      const optionOneFileUpload = fs.writeFileSync(`${uploadPath}/${findSet?.name}/1.jpg`, optionOneFile.buffer )
      console.log(optionOneFileUpload)
    }
      // if (!questionText) {
      //   errors.question = 'Question is required';
      // }
      // if((optionType === 'file') && (typeof optionOneText === 'string' || typeof optionOneText === 'string' || typeof optionThreeText === 'string' || typeof optionFourText === 'string')  ){
      //   errors.options = 'option must be file'
      // }
      // if (!optionOneText) {
      //   errors.options = 'Option 1 is required';
      // }
      // if (!optionTwoText) {
      //   errors.options = 'Option 2 is required';
      // }
      // if (!optionThreeText) {
      //   errors.options = 'Option 3 is required';
      // }
      // if (!optionFourText) {
      //   errors.options = 'Option 4 is required';
      // }

      
    await ExamServices.addQuestion()
})


export const ExamControllers = {
    getAllSet,
    getSingleSet,
    addSet,

    addQuestion
}
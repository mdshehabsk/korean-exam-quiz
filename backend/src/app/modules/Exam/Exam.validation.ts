import catchAsync from "../../utils/catchAsync";



const addQuestionValidation = catchAsync((req,res,next)=> {
    next()
})


export const ExamValidation = {
    addQuestionValidation
}
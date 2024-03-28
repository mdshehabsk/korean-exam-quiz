import catchAsync from "../../utils/catchAsync";



const addQuestionValidation = catchAsync((req,res,next)=> {
    console.log(req.body)
    next()
})


export const ExamValidation = {
    addQuestionValidation
}
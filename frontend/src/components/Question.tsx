import { IMAGE } from "@utils/image";
import QuestionOptionBtn from "./QuestionOptionBtn";
import {  ISetQuestions } from "../types/exam"
import { useAppDispatch } from "@toolkit/hook";
import { getCurrentQuestion, reset } from "@toolkit/Exam/examSlice";


type TProps = {
  currentQuestion: ISetQuestions,
  questions: ISetQuestions[],
  submitBtn: boolean
}



const defaultProps = {
  currentQuestion: {},
  Question: [],
  submitBtn: true
}

const Question = (props:TProps) => {
  const {currentQuestion,questions,submitBtn} = props

  const dispatch = useAppDispatch()
  const prevQuestionFn = () => {
    const newQuestion = questions?.find(question => Number(question.id ) === Number(currentQuestion.id ) - 1)
    dispatch(getCurrentQuestion(newQuestion))
  }

  const nextQuestionFn = () => {
    const newQuestion = questions?.find(question => Number(question.id ) === Number(currentQuestion.id ) + 1)
    dispatch(getCurrentQuestion(newQuestion))
  }
  const totalQuestionFn = () => dispatch(reset())
  return (
    <div className="w-full">
      <div className="my-5">
        <h1 className="text-xl">
        {currentQuestion?.id}. {currentQuestion?.question}
        </h1>
      </div>
      <div className="flex flex-wrap justify-center w-full ">
        <div className="basis-full md:basis-5/12   ">
          <div className="flex items-center justify-center w-full h-full" >
            <img src={IMAGE.koreanExam} alt="no image" />
        
          </div>
        </div>
        <div className="basis-full md:basis-5/12  ">
          <div className="p-2  md:p-8 ">
            <div className="flex flex-col justify-center items-center">
            {/* <QuestionOptionBtn number='1' value='고르십시오'  />  */}

              {
                currentQuestion?.options?.map(option =>  <QuestionOptionBtn  key={option.id} number={Number(option.id)} value={option.value}  /> )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="exam--footer ">
          <div className="container bg-white flex flex-wrap justify-center lg:justify-end my-4 ">
           <button type="button"  className="exam-footer-btn bg-blue-700 hover:bg-blue-800" onClick={prevQuestionFn}  disabled={currentQuestion.id <= questions[0].id} >Previous</button >
            
            <button type="button"  className="exam-footer-btn bg-yellow-700 hover:bg-yellow-800"  onClick={totalQuestionFn} >Total</button >
            <button type="button"  className="exam-footer-btn bg-red-700 hover:bg-red-800" onClick={nextQuestionFn} disabled={currentQuestion.id >= questions[questions.length - 1].id }  >Next</button >
           {
            submitBtn &&  <button type="button"  className="exam-footer-btn bg-green-700 hover:bg-green-800" >Submit</button >
           }
          </div>
        </div>
    </div>
  );
};


Question.defaultProps = defaultProps

export default Question;

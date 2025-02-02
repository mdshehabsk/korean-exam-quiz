import { FC, useState } from "react";
import { ISet } from "../types/exam";
import Questions from "./Questions";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { handleResultCurrentQuestion , resetResultCurrentQuestion } from "@toolkit/Exam/examSlice";
import Question from "./Question";
import React from "react";


interface IProps {
  submitResult : {
    returnSubmitedSet: ISet
    correctAnswers: number
    totalScore : number
  }
 
}


const ExamResult : FC<IProps> = ({submitResult}) => {
  const [isReview,setIsReview] = useState(false)
  const dispatch = useAppDispatch()
  const { resultCurrentQuestion } = useAppSelector(
    (state) => state.exam
  );
  const {returnSubmitedSet: data} = submitResult
  const newPrevQuestion = data?.questions?.find(
    (question) => question.number === (resultCurrentQuestion?.number || 0) - 1
  );
  const newNextQuestion = data.questions?.find(
    (question) => question.number === (resultCurrentQuestion?.number || 0) + 1
  );
  const prevQuestionFn = () => {
    dispatch(handleResultCurrentQuestion(newPrevQuestion));
  };
  const nextQuestionFn = () => {
    dispatch(handleResultCurrentQuestion(newNextQuestion));
  };
  const totalQuestionFn = () => dispatch(resetResultCurrentQuestion());

  function handleExit () {
    window.location.pathname = '/'
  }

  return (
    <div className="container mx-auto bg-white">
      <div className=" bg-gray-200 flex justify-center items-center">
        <h1 className="text-black text-xl py-4 "> Result </h1>
      </div>
      <div className="flex justify-center gap-10 my-4 ">
        <h2 className="text-2xl font-semibold ">Correct Answer :  {submitResult?.correctAnswers} </h2>
        <h2 className="text-2xl font-semibold ">Result: {submitResult?.totalScore} </h2>
      </div>
  {
     isReview &&  !resultCurrentQuestion && <Questions set={submitResult?.returnSubmitedSet} result={true}  />
  }
      {resultCurrentQuestion && isReview && submitResult && (
            <div className="exam-question">
              <div className="container bg-white py-3">
                <Question currentQuestion={resultCurrentQuestion} set={data} />
              </div>
            </div>
          )}
            {resultCurrentQuestion && isReview && (
            <div className="exam--footer ">
              <div className="exam--footer ">
                <div className="container bg-white flex flex-wrap justify-center lg:justify-end  ">
                  {resultCurrentQuestion && (
                    <React.Fragment>
                      <button
                        type="button"
                        className={`exam-footer-btn   ${
                          newPrevQuestion ? "bg-blue-700" : "bg-blue-500"
                        } `}
                        onClick={prevQuestionFn}
                        disabled={newPrevQuestion ? false : true}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="exam-footer-btn bg-yellow-700 hover:bg-yellow-800"
                        onClick={totalQuestionFn}
                      >
                        Total
                      </button>
                      <button
                        type="button"
                        className={`exam-footer-btn 0 ${
                          newNextQuestion ? "bg-red-700" : "bg-red-500"
                        } `}
                        onClick={nextQuestionFn}
                        disabled={newNextQuestion ? false : true}
                      >
                        Next
                      </button>
                    </React.Fragment>
                  )}

                </div>
              </div>
            </div>
          )}
      <div className="flex justify-center gap-10 my-4">
        {!isReview && <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium px-8 py-2 rounded-full  "
          onClick={()=> setIsReview(true)}
        >
          Review
        </button>}
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800  font-medium  px-8 py-2 rounded-full "
          onClick={handleExit}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default ExamResult;

import { ISet, ISetQuestion } from "../types/exam";
import { handleCurrentQuestion, handleResultCurrentQuestion } from "@toolkit/Exam/examSlice";
import { useAppDispatch } from "@toolkit/hook";
import { LOGO } from "@utils/logo";
import { useAppSelector } from "@toolkit/hook";

import React from "react";

type TProps = {
  set: ISet;
  result: boolean
};

const defaultProps = {
  result : false,
  set: [],
};

const Questions = (props: TProps) => {
  const {result} = props
  const dispatch = useAppDispatch();
  const { set } = props;
  const { submitExamData } = useAppSelector((state) => state.exam);

  const readingQuestions = set?.questions?.filter(
    (question) => question.type === "reading"
  );
  const listeningQuestions = set?.questions?.filter(
    (question) => question.type === "listening"
  );

  const btnClick = (currentQuestion: ISetQuestion) => {
    if(result){
      return dispatch(handleResultCurrentQuestion(currentQuestion))
    }
    dispatch(handleCurrentQuestion(currentQuestion));
  };

  return (
    <div className="exam--question">
      <div className="container bg-white py-3 ">
        <div className="flex flex-wrap justify-center gap-2 ">
          {/* reading questions */}
          <div className="bg-gray-100 p-3 max-w-[350px] w-full ">
            <div className="flex p-2 items-center gap-2 justify-center ">
              <img className="max-w-[30px]" src={LOGO.reading} alt="no image" />
              <p className="text-lg"> Reading </p>
              <h3 className="font-semibold text-2xl"> (Question:20) </h3>
            </div>
            <div className=" grid grid-cols-4 my-3 gap-2 ">
              {readingQuestions?.map((questionItem, index) => (
                <button
                  key={index}
                  onClick={() => btnClick(questionItem)}
                  type="button"
                  className={` ${
                    submitExamData[questionItem?._id]
                      ? " text-white bg-blue-500"
                      : "text-blue-700 border-blue-700  "
                  } ${
                    questionItem?.selected != questionItem?.answer && props.result
                      ? "bg-red-600"
                      : null
                  }  border  focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2`}
                >
                  {questionItem?.number}
                </button>
              ))}
            </div>
          </div>
          {/* listening questions */}
          <div className="bg-gray-100 p-3 max-w-[350px] w-full ">
            <div className="flex p-2 items-center gap-2 justify-center ">
              <img
                className="max-w-[30px]"
                src={LOGO.listening}
                alt="no image"
              />
              <p className="text-lg"> Listening </p>
              <h3 className="font-semibold text-2xl"> (Question:20) </h3>
            </div>
            <div className=" grid grid-cols-4 my-3 gap-2 ">
              {listeningQuestions?.map((questionItem, index) => (
                <button
                  key={index}
                  onClick={() => btnClick(questionItem)}
                  type="button"
                  className={` ${
                    submitExamData[questionItem?._id]
                      ? " text-white bg-blue-500"
                      : "text-blue-700 border-blue-700  "
                  } ${
                    questionItem?.selected != questionItem?.answer && props.result
                      ? "bg-red-600"
                      : null
                  }  border  focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2`}
                >
                  {questionItem?.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Questions.defaultProps = defaultProps;

export default React.memo(Questions);

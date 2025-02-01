import { useSubmitExamMutation } from "@toolkit/Exam/setApi";
import { ISet, ISetQuestion } from "../types/exam";
import { handleCurrentQuestion } from "@toolkit/Exam/examSlice";
import { useAppDispatch } from "@toolkit/hook";
import { LOGO } from "@utils/logo";
import { useAppSelector } from "@toolkit/hook";
import QuestionBtn from "./QuestionBtn";
import React from "react";

type TProps = {
  set: ISet;
  footer: boolean;
};

const defaultProps = {
  footer: true,
  set: [],
};

const Questions = (props: TProps) => {
  const dispatch = useAppDispatch()
  const { set, footer } = props;
  const [mutateSubmitExam] = useSubmitExamMutation();
  const { submitExamData } = useAppSelector((state) => state.exam);
  const handleSubmitExam = () => {
    const setId = set._id;
    mutateSubmitExam({
      setId,
      submitExamData,
    });
  };
  const readingQuestions = set?.questions
    ?.filter((question) => question.type === "reading")
  const listeningQuestions = set?.questions
    ?.filter((question) => question.type === "listening")


  const btnClick = (currentQuestion: ISetQuestion) => {
    dispatch(handleCurrentQuestion(currentQuestion))
  }
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
                <QuestionBtn select={submitExamData[questionItem?._id] ? true: false} key={index} onClick={() => btnClick(questionItem) }>
                  {questionItem?.number}
                </QuestionBtn>
              ))}
            </div>
          </div>
          {/* listening questions */}
          <div className="bg-gray-100 p-3 max-w-[350px] w-full ">
            <div className="flex p-2 items-center gap-2 justify-center ">
              <img className="max-w-[30px]" src={LOGO.listening} alt="no image" />
              <p className="text-lg"> Listening </p>
              <h3 className="font-semibold text-2xl"> (Question:20) </h3>
            </div>
            <div className=" grid grid-cols-4 my-3 gap-2 ">
              {listeningQuestions?.map((questionItem, index) => (
                <QuestionBtn select={submitExamData[questionItem?._id] ? true: false} key={index} onClick={() => btnClick(questionItem) }>
                  {questionItem?.number}
                </QuestionBtn>
              ))}
            </div>
          </div>

        </div>
      </div>
      {footer && (
        <div className="exam--footer ">
          <div className="container bg-white flex flex-wrap justify-center lg:justify-end py-3 ">
            <button
              onClick={handleSubmitExam}
              type="button"
              className="exam-footer-btn bg-green-700 hover:bg-green-800"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Questions.defaultProps = defaultProps;


export default React.memo(Questions);

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { ImVolumeMedium } from "react-icons/im";
import {
  handleCurrentQuestion,
  handleSubmitExamData,
  reset,
  handlePlayedAudios,
  handleIsAudioPlaying
} from "@toolkit/Exam/examSlice";
import QuestionOptionBtn from "./QuestionOptionBtn";
import { ISet, ISetQuestion } from "../types/exam";
import React from "react";

type TProps = {
  currentQuestion: ISetQuestion;
  submitBtn: boolean;
  set: ISet;
  optionAction: boolean;
};

const defaultProps = {
  currentQuestion: {},
  Question: [],
  submitBtn: true,
  optionAction: true,
};

const Question = (props: TProps) => {
  const { currentQuestion, set, submitBtn, optionAction } = props;
  const dispatch = useAppDispatch();
  const { submitExamData, isAudioPlaying, playedAudios  } = useAppSelector((state) => state.exam);
  const newPrevQuestion = set.questions.find(
    (question) => question.number === (currentQuestion?.number || 0) - 1
  );
  const newNextQuestion = set.questions.find(
    (question) => question.number === (currentQuestion?.number || 0) + 1
  );
  const prevQuestionFn = () => {
    dispatch(handleCurrentQuestion(newPrevQuestion));
  };
  const nextQuestionFn = () => {
    dispatch(handleCurrentQuestion(newNextQuestion));
  };
  const totalQuestionFn = () => dispatch(reset());



  const descriptionAudioPlay = (audioLink: string) => {
    if (isAudioPlaying || playedAudios[currentQuestion?._id]?.descriptionPlayed) return;
  
    const audio = new Audio(audioLink);
    dispatch(handleIsAudioPlaying(true));
  
    audio.play();
  
    audio.onended = () => {
      dispatch(handleIsAudioPlaying(false));
      dispatch(handlePlayedAudios({ questionId: currentQuestion?._id, type: "description" }));
    };
  };
  
  const optionAudioPlay = (audioLink: string, index: number) => {
    if (
      isAudioPlaying ||
      playedAudios[currentQuestion?._id]?.options?.includes(index)
    ) {
      return;
    }
  
    const audio = new Audio(audioLink);
    dispatch(handleIsAudioPlaying(true));
  
    audio.play();
  
    audio.onended = () => {
      dispatch(handleIsAudioPlaying(false));
      dispatch(handlePlayedAudios({ questionId: currentQuestion?._id, type: "options", currentOptionIndex: index }));
    };
  };
  const handleSelectOption = (answerId: number) => {
    if (optionAction) {
      dispatch(
        handleSubmitExamData({
          setId: set?._id,
          questionId: currentQuestion?._id,
          answerId,
        })
      );
    }
  };

  return (
    <div className="w-full">
      <div className="my-5">
        <h1 className="text-3xl font-semibold ">
          {currentQuestion?.number}. {currentQuestion?.title}
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-[30px] w-full ">
        <div className="basis-full md:basis-5/12   ">
          <div className="flex items-center  w-full h-full">
            {currentQuestion?.descriptionType === "image" && (
              <img src={currentQuestion?.description} alt="description image" />
            )}
            {currentQuestion?.descriptionType === "text" && (
              <div
                className="text-2xl font-korean "
                dangerouslySetInnerHTML={{
                  __html: currentQuestion?.description,
                }}
              ></div>
            )}
             {currentQuestion?.descriptionType === "audio" && (
              <div onClick={() => descriptionAudioPlay(currentQuestion?.description)}>
              <ImVolumeMedium
                  className={`text-6xl ${
                    playedAudios?.[currentQuestion?._id]?.descriptionPlayed ? "opacity-50" : ""
                  }`}
              />
            </div>
            )}
          </div>
        </div>
        <div className="basis-full md:basis-5/12  ">
          <div className="p-2  md:p-8 ">
            <div className="justify-center items-center  ">
              {currentQuestion?.optionsType === "text" &&
                currentQuestion?.options?.map((option, i) => (
                  <QuestionOptionBtn
                    select={
                      optionAction
                        ? submitExamData[currentQuestion?._id] === i + 1
                        : currentQuestion.answer == i + 1
                    }
                    getSelectedOption={handleSelectOption}
                    number={i + 1}
                  >
                    <p className="font-semibold font-korean text-2xl">
                      {option}
                    </p>
                  </QuestionOptionBtn>
                ))}
              {currentQuestion?.optionsType === "image" &&
                currentQuestion?.options?.map((option, i) => (
                  <QuestionOptionBtn
                    select={
                      optionAction
                        ? submitExamData[currentQuestion?._id] === i + 1
                        : currentQuestion.answer == i + 1
                    }
                    getSelectedOption={handleSelectOption}
                    number={i + 1}
                    key={i}
                  >
                    <img src={option} alt="" />
                  </QuestionOptionBtn>
                ))}
              {currentQuestion?.optionsType === "audio" &&
                currentQuestion?.options?.map((option, i) => (
                  <QuestionOptionBtn
                    select={
                      optionAction
                        ? submitExamData[currentQuestion?._id] === i + 1
                        : currentQuestion.answer == i + 1
                    }
                    getSelectedOption={handleSelectOption}
                    number={i + 1}
                    key={i}
                  >
                    <div onClick={() => optionAudioPlay(option,i)}>
                      <ImVolumeMedium
                        className={`text-6xl ${
                          playedAudios?.[currentQuestion?._id]?.options?.includes(i) ? "opacity-50" : ""
                        }`}
                      />
                    </div>
                  </QuestionOptionBtn>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="exam--footer ">
        <div className="container bg-white flex flex-wrap justify-center lg:justify-end my-4 ">
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
          {submitBtn && (
            <button
              type="button"
              className="exam-footer-btn bg-green-700 hover:bg-green-800"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Question.defaultProps = defaultProps;

export default React.memo(Question);

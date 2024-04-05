import { setApi, useGetSingleSetQuery, useSubmitExamMutation } from "@toolkit/Exam/setApi";
import Question from "@components/Question";
import ExamTopbar from "@components/ExamTopbar";
import Questions from "@components/Questions";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentQuestion, getSubmitExamData } from "@toolkit/Exam/examSlice";
import { ISubmitQuestionsData } from "../../types/exam";
import ExamResult from "@components/ExamResult";

interface Time {
  minutes: number;
  seconds: number;
}
const index = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [time, setTime] = useState<Time>({ minutes: 1, seconds: 0 });
  const [mutateSubmitExam] = useSubmitExamMutation()
  useEffect(() => {
    const timer = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(timer);
        // Perform any action here when countdown reaches zero
        apiCall();
      } else {
        setTime((prevTime) => {
          if (prevTime.seconds === 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          }
        });
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [time]);

  const { data, isLoading } = useGetSingleSetQuery(id as string);
  const { currentQuestion , submitExamData } = useAppSelector((state) => state.exam);


  const handleChangeQuestionData = async (submitData: ISubmitQuestionsData) => {
    const { optionId, questionId } = submitData;
    dispatch(getSubmitExamData({optionId,questionId}))
    dispatch(
      setApi.util.updateQueryData(
        "getSingleSet",
        data?.data._id as string,
        (draft) => {
          const targetQuestionIndex = draft.data.questions?.findIndex(
            (question) => question.questionId === questionId
          );

          if (targetQuestionIndex !== -1) {
            draft.data.questions[targetQuestionIndex].select = true;
            draft.data.questions[targetQuestionIndex].options?.forEach(
              (option) => {
                option.select = option.id === optionId;
              }
            );
          } else {
            console.warn(
              "Question with ID",
              questionId,
              "not found in the cached data for 'getSingleSet'"
            );
          }
        }
      )
    );
    const updateCurrentQuestionOptions = currentQuestion?.options.map(
      (option) => {
        if (option.id === optionId) {
          return {
            ...option,
            select: true,
          };
        }
        return {
          ...option,
          select: false,
        };
      }
    );
    dispatch(
      getCurrentQuestion({
        ...currentQuestion,
        options: updateCurrentQuestionOptions,
      })
    );
  };

  function apiCall() {
    mutateSubmitExam({
      setId : id,
      submitExamData
    })
  }
  return (
    <>
      <div>
        {isLoading && <h3>Loading...</h3>}
        {data && (
          <>
            <ExamTopbar
              time={time}
              solved={submitExamData.length}
              unsolved={40 - submitExamData.length}
            />
            {!currentQuestion && (
              <div className="exam-questions">
                <Questions set={data?.data} />
              </div>
            )}
            {currentQuestion && (
              <div className="exam-question">
                <div className="container bg-white py-3">
                  <Question
                    currentQuestion={currentQuestion}
                    questions={data?.data?.questions}
                    handleChangeQuestionData={handleChangeQuestionData}
                  />
                </div>
              </div>
            )}
            {/* <ExamResult/> */}
          </>
        )}
      </div>
    </>
  );
};

export default index;

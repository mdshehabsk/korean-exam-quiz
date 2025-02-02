import { useSubmitExamMutation } from "@toolkit/Exam/setApi";
import Question from "@components/Question";
import ExamTopbar from "@components/ExamTopbar";
import Questions from "@components/Questions";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ExamResult from "@components/ExamResult";
import { handleCurrentQuestion, reset } from "@toolkit/Exam/examSlice";

// import ExamResult from "@components/ExamResult";

interface Time {
  minutes: number;
  seconds: number;
}

const Singleset = () => {
  const { id } = useParams();
  const [time, setTime] = useState<Time>({ minutes: 50, seconds: 0 });
  const [clearTime,setClearTime] = useState(true)
  const [mutateSubmitExam, { data: submitResult }] = useSubmitExamMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentSet: data } = useAppSelector((state) => state.set);
  useEffect(() => {
    const timer = setInterval(() => {
      if(clearTime){
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
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [time,clearTime]);

  // const { data, isLoading } = useGetSingleSetQuery(id as string);
  const { currentQuestion, submitExamData } = useAppSelector(
    (state) => state.exam
  );

  if (id === "prefetch" && !data?._id) {
    navigate("/not-found");
  }

  function apiCall() {
    mutateSubmitExam({
      setId: data?._id,
      submitExamData,
    });
  }

  const newPrevQuestion = data?.questions?.find(
    (question) => question.number === (currentQuestion?.number || 0) - 1
  );
  const newNextQuestion = data.questions?.find(
    (question) => question.number === (currentQuestion?.number || 0) + 1
  );
  const prevQuestionFn = () => {
    dispatch(handleCurrentQuestion(newPrevQuestion));
  };
  const nextQuestionFn = () => {
    dispatch(handleCurrentQuestion(newNextQuestion));
  };
  const totalQuestionFn = () => dispatch(reset());
  function handleSubmitExam() {
    setTime({minutes:0,seconds:0})
    setClearTime(false)
    mutateSubmitExam({
      setId: data?._id,
      submitExamData,
    });
  }
  return (
    <div>
      {data && (
        <>
          <ExamTopbar
            time={time}
            solved={Object.values(submitExamData).length}
            unsolved={40 - Object.values(submitExamData).length}
          />
          {!currentQuestion && !submitResult && (
            <div className="exam-questions">
              <Questions set={data} />
            </div>
          )}
          {currentQuestion && !submitResult && (
            <div className="exam-question">
              <div className="container bg-white py-3">
                <Question currentQuestion={currentQuestion} set={data} />
              </div>
            </div>
          )}
          {!submitResult && (
            <div className="exam--footer ">
              <div className="exam--footer ">
                <div className="container bg-white flex flex-wrap justify-center lg:justify-end  ">
                  {currentQuestion && (
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

                  <button
                    type="button"
                    className={`exam-footer-btn  bg-green-700 hover:bg-green-800`}
                    onClick={handleSubmitExam}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {submitResult && <ExamResult submitResult={submitResult?.data} />}
    </div>
  );
};

export default Singleset;

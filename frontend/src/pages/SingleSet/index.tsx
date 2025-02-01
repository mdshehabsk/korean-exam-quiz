import {  useSubmitExamMutation } from "@toolkit/Exam/setApi";
import Question from "@components/Question";
import ExamTopbar from "@components/ExamTopbar";
import Questions from "@components/Questions";
import { useAppSelector } from "@toolkit/hook";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// import ExamResult from "@components/ExamResult";

interface Time {
  minutes: number;
  seconds: number;
}



const Singleset = () => {
  const { id } = useParams();
  const [time, setTime] = useState<Time>({ minutes: 1, seconds: 0 });
  const [mutateSubmitExam] = useSubmitExamMutation()
  const navigate = useNavigate()
  const {currentSet: data} = useAppSelector(state => state.set)
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

  // const { data, isLoading } = useGetSingleSetQuery(id as string);
  const { currentQuestion , submitExamData } = useAppSelector((state) => state.exam);

  if(id === 'prefetch' && !data?._id) {
    navigate('/not-found')
  }

  function apiCall() {
    mutateSubmitExam({
      setId : id,
      submitExamData
    })
  }
  return (
    <>
      <div>
        {data && (
          <>
            <ExamTopbar
              time={time}
              solved={Object.values(submitExamData).length}
              unsolved={40 - Object.values(submitExamData).length}
            />
            {!currentQuestion && (
              <div className="exam-questions">
                <Questions set={data} />
              </div>
            )}
            {currentQuestion && (
              <div className="exam-question">
                <div className="container bg-white py-3">
                  <Question
                    currentQuestion={currentQuestion}
                    set={data}
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

export default Singleset



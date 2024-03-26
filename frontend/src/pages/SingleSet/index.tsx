import { useGetSingleSetQuery } from "@toolkit/Exam/setApi";
import Question from "@components/Question";
import ExamTopbar from "@components/ExamTopbar";
import Questions from "@components/Questions";
import { useAppSelector } from "@toolkit/hook";
import { useParams } from "react-router-dom";
const index = () => {
  const {id} = useParams()
  const { data, isLoading } = useGetSingleSetQuery(id as string);
  const {currentQuestion} = useAppSelector(state => state.exam)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime(prevTime => {
  //       if (prevTime.seconds === 0) {
  //         if (prevTime.minutes === 0) {
  //           clearInterval(timer);
  //           // Timer has reached 0
  //           alert("Time's up!");
  //           return initialTime;
  //         } else {
  //           return { minutes: prevTime.minutes - 1, seconds: 59 };
  //         }
  //       } else {
  //         return { ...prevTime, seconds: prevTime.seconds - 1 };
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <>
      <div>
        {isLoading && <h3>Loading...</h3>}
        {data && (
          <>
            <ExamTopbar />
           {!currentQuestion &&  <div className="exam-questions">
              <Questions set={data?.data} />
            </div>}
            {currentQuestion && <div className="exam-question">
              <div className="container bg-white py-3">
                <Question currentQuestion={currentQuestion} questions={data?.data?.questions} />
              </div>
            </div>}
          </>
        )}
      </div>
    </>
  );
};

export default index;

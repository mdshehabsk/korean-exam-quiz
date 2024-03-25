import { useGetSingleSetQuery } from "@toolkit/Exam/setApi";
import Question from "@components/Question";
import Questions from "@components/Questions";
import { useAppSelector } from "@toolkit/hook";
const index = () => {
  const { data, isLoading } = useGetSingleSetQuery(undefined);
  const { currentQuestion } = useAppSelector((state) => state.exam);
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
        <div className="px-9 py-5 my-4 bg-gray-100 flex flex-wrap items-center justify-between">
         <div>
         <h2 className="text-xl text-black">Set-3</h2>
         <p className="text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum maiores dolorum facilis atque adipisci!</p>
         </div>
          <div className="flex items-center gap-2  " >
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium  px-8 py-3 text-center mb-2 rounded "
            >
             Publish
            </button>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none  font-medium  px-8 py-3 text-center mb-2 rounded  "
            >
              Delete
            </button>
          </div>
        </div>
        {isLoading && <h3>Loading...</h3>}
        {data && (
          <>
            {!currentQuestion && (
              <div className="exam-questions">
                <Questions set={data?.data} footer={false} />
              </div>
            )}
            {currentQuestion && (
              <div className="exam-question">
                <div className="container bg-white py-3">
                  <Question
                    currentQuestion={currentQuestion}
                    questions={data?.data?.questions}
                    submitBtn={false}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default index;


import Question from "@components/Question";
import Questions from "@components/Questions";
import { useAppSelector } from "@toolkit/hook";
import { useParams } from "react-router-dom";
import { useGetSingleSetForAdminQuery } from "@toolkit/Admin/adminApi";
const Index = () => {
  const {id} = useParams()
  const { data, isLoading } = useGetSingleSetForAdminQuery(id as string);
  const { currentQuestion } = useAppSelector((state) => state.exam);
  data?.data?.questions
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
                    set={data?.data}
                    submitBtn={false}  
                    optionAction={false}
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

export default Index;

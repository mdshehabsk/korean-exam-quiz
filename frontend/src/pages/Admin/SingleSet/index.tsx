
import Question from "@components/Question";
import Questions from "@components/Questions";
import { useAppSelector } from "@toolkit/hook";
import { useParams } from "react-router-dom";
import { useGetSingleSetForAdminQuery , useUpdateSetMutation } from "@toolkit/Admin/adminApi";
const Index = () => {
  const {id} = useParams()
  const { data, isLoading } = useGetSingleSetForAdminQuery(id as string);
  const { currentQuestion } = useAppSelector((state) => state.exam);
  const [updateMutate] = useUpdateSetMutation()
  return (
    <>
      <div>
        <div className="px-9 py-5 my-4 bg-gray-100 flex flex-wrap items-center justify-between">
         <div>
         <h2 className="text-xl text-black">Set-3</h2>
         <p className="text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum maiores dolorum facilis atque adipisci!</p>
         </div>
          <div className="flex items-center gap-2  " >
           
            {
              data?.data?.status === 'draft' &&  <button
              onClick={()=> updateMutate({setId: data?.data?._id,status:'publish'})}
              disabled={data?.data?.questions.length < 40}
              type="button"
              className={`focus:outline-none text-white ${data?.data?.questions.length < 40 ? 'opacity-50' : 'opacity-100'} bg-green-700 hover:bg-green-800 font-medium  px-8 py-3 text-center mb-2 rounded `}
            >
             Publish
            </button>
            }
            {
              data?.data?.status === 'publish' && <button
              onClick={()=> updateMutate({setId: data?.data?._id,status:'draft'})}
              type="button"
              className="focus:outline-none border border-red-600 font-medium text-red-600 px-8 py-3 text-center mb-2 rounded "
            >
             Make Draft
            </button>
            }
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

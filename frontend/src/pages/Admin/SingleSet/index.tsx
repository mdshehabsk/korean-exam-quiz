import Question from "@components/Question";
import Questions from "@components/Questions";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { useParams } from "react-router-dom";
import {
  useGetSingleSetForAdminQuery,
  useUpdateSetMutation,
} from "@toolkit/Admin/adminApi";
import { handleCurrentQuestion, reset } from "@toolkit/Exam/examSlice";
import React from "react";
const Index = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleSetForAdminQuery(id as string);
  const { currentQuestion } = useAppSelector((state) => state.exam);
  const [updateMutate] = useUpdateSetMutation();
  const dispatch = useAppDispatch();
  const newPrevQuestion = data?.data?.questions?.find(
    (question) => question.number === (currentQuestion?.number || 0) - 1
  );
  const newNextQuestion = data?.data.questions?.find(
    (question) => question.number === (currentQuestion?.number || 0) + 1
  );
  const prevQuestionFn = () => {
    dispatch(handleCurrentQuestion(newPrevQuestion));
  };
  const nextQuestionFn = () => {
    dispatch(handleCurrentQuestion(newNextQuestion));
  };
  const totalQuestionFn = () => dispatch(reset());
  return (
    <>
      <div>
        <div className="px-9 py-5 my-4 bg-gray-100 flex flex-wrap items-center justify-between">
          <div>
            <h2 className="text-xl text-black">Set-3</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
              maiores dolorum facilis atque adipisci!
            </p>
          </div>
          <div className="flex items-center gap-2  ">
            {data?.data?.status === "draft" && (
              <button
                onClick={() =>
                  updateMutate({ setId: data?.data?._id, status: "publish" })
                }
                disabled={data?.data?.questions.length < 40}
                type="button"
                className={`focus:outline-none text-white ${
                  data?.data?.questions.length < 40
                    ? "opacity-50"
                    : "opacity-100"
                } bg-green-700 hover:bg-green-800 font-medium  px-8 py-3 text-center mb-2 rounded `}
              >
                Publish
              </button>
            )}
            {data?.data?.status === "publish" && (
              <button
                onClick={() =>
                  updateMutate({ setId: data?.data?._id, status: "draft" })
                }
                type="button"
                className="focus:outline-none border border-red-600 font-medium text-red-600 px-8 py-3 text-center mb-2 rounded "
              >
                Make Draft
              </button>
            )}
          </div>
        </div>
        {isLoading && <h3>Loading...</h3>}
        {data && (
          <React.Fragment>
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
                    set={data?.data}
                    submitBtn={false}
                    optionAction={false}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

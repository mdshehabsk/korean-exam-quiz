import React, { useState } from "react";

import QuestionsTab from "./QuestionsTab";
import QuestionBox from "./QuestionBox";
import OptionBox from "./OptionBox";
import ReadingQuestionBox from "./ReadingQuestionBox";
import ListeningQuestionBox from "./ListeningQuestionBox";
import TitleQuestionBox from "./TitleQuestionBox";
import { useAddQuestionMutation } from "@toolkit/Exam/questionApi";

type TProps = {
  isOpen: boolean;
  modalToggle: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  setId:string
};
const defaultProps = {
  isOpen: false,
  modalToggle: () => {},
  setId:''
};
type TOptions = { id: number; value: string | File  ; select: boolean }
const AddQuestionModal = (props: TProps) => {
  const [mutate] = useAddQuestionMutation()
  const { isOpen, modalToggle , setId } = props;
  const [activeTab, setActiveTab] = useState<"Reading" | "Listening">(
    "Reading"
  );
  const [titleQuestion,setTitleQuestion] = useState('')
  const [options,setOptions] = useState<{type:string,options:TOptions[]}>({
    type:'',
    options:[]
  })
  const [question,setQuestion] = useState<{type:string,question:string | File}>({
    type:'',
    question:''
  })

  const handleSubmitQuestion = () => {
    const formData = new FormData()
    formData.append('addQuestionType',activeTab)
    formData.append('questionType',question.type)
    formData.append('titleQuestion',titleQuestion),
    formData.append('optionsType',options.type)
    formData.append('question',question.question)
    for(let i in options.options){
      formData.append(`option${Number(i)+ 1}`,options.options[i].value)
    }
    const correctId = options?.options?.find(option => option.select)?.id as unknown  as  string
    formData.append('answer',correctId)
    mutate({setId,formData})
  }

  return (
    <div
      className={` w-full h-screen absolute  ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center top-0 left-0 right-0  bg-slate-300/50`}
    >
      <div className="w-[700px]  overflow-y-auto max-h-[600px] ">
        <div className="relative  p-4 w-full  max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Set-1
              </h3>
              <button
                onClick={modalToggle}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <QuestionsTab
              getActiveTab={(value) => setActiveTab(value)}
              activeTab={activeTab}
            />
            {activeTab === "Reading" && (
              <ReadingQuestionBox>
                <>
                  <TitleQuestionBox getTitleQuestionValue={value => setTitleQuestion(value)} />
                  <QuestionBox getQuestion={(type,question)=> setQuestion({type,question})} />
                  <OptionBox getOptions={(type,options) => setOptions({type,options})} />
                </>
              </ReadingQuestionBox>
            )}
            {activeTab === "Listening" && (
              <ListeningQuestionBox>
                <>
                  <TitleQuestionBox getTitleQuestionValue={value => setTitleQuestion(value)} />
                  <QuestionBox  getQuestion={(type,question)=> setQuestion({type,question})} />
                  <OptionBox getOptions={(type,options) => setOptions({type,options})} />
                </>
              </ListeningQuestionBox>
            )}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
              <button
              onClick={handleSubmitQuestion}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800  font-medium w-full text-sm px-5 py-2.5 text-center "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddQuestionModal.defaultProps = defaultProps;

export default AddQuestionModal;

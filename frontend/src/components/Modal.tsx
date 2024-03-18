import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuestionsTab from "./QuestionsTab";
import Switch from "./Switch";

type TProps = {
  isOpen: boolean;
  modalToggle: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
};
const defaultProps = {
  isOpen: false,
  modalToggle: () => {},
};
const Modal = (props: TProps) => {
  const [optionType, setOptionType] = useState("text");
  const [questionType, setQuestionType] = useState("text");
  const { isOpen, modalToggle } = props;
  const [value, setValue] = useState("");
  const [activeTab,setActiveTab] = useState <string>('Reading')
  const [titleQuestion,setTitleQuestion] = useState(false)
  const questionRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionType(event.target.value);
  };
  const optionRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionType(event.target.value);
  };
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

<QuestionsTab getActiveTab={value => setActiveTab(value)} activeTab={activeTab} />
<div className="p-4" >
<Switch isOn={titleQuestion} switchToggle={value => setTitleQuestion(value)} />
</div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="relative">
                <label htmlFor="question" className="my-2">
                  Enter Question?
                </label>
                <form className="flex items-center gap-2 my-4 ">
                  <div className="flex items-center">
                    <input
                      onChange={questionRadioChange}
                      checked={questionType === "text"}
                      id="question-text"
                      type="radio"
                      value="text"
                      name="text"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="question-text"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Text
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      onChange={questionRadioChange}
                      checked={questionType === "file"}
                      id="question-file"
                      type="radio"
                      value="file"
                      name="file"
                      className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="question-file"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      File
                    </label>
                  </div>
                </form>
                {questionType === "text" && (
                  <div className="my-5">
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <label>Add option</label>
              <form className="flex items-center gap-2">
                <div className="flex items-center">
                  <input
                    onChange={optionRadioChange}
                    checked={optionType === "text"}
                    id="option-text"
                    type="radio"
                    value="text"
                    name="text"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="option-text"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Text
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={optionRadioChange}
                    checked={optionType === "file"}
                    id="option-file"
                    type="radio"
                    value="file"
                    name="file"
                    className="w-4 h-4 text-blue-700 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="option-file"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    File
                  </label>
                </div>
              </form>
              {optionType === "text" && (
                <div>
                  <div>
                    <label htmlFor="option-1">Option One</label> <br />
                    <input
                      type="text"
                      id="option-1"
                      placeholder="Option One"
                      className="border border-black/50 rounded-sm px-2 py-2 w-full my-2 outline-none  "
                    />
                  </div>
                  <div>
                    <label htmlFor="option-2">Option Two</label> <br />
                    <input
                      type="text"
                      id="option-2"
                      placeholder="Option Two"
                      className="border border-black/50 rounded-sm px-2 py-2 w-full my-2 outline-none  "
                    />
                  </div>
                  <div>
                    <label htmlFor="option-3">Option Three</label> <br />
                    <input
                      type="text"
                      id="option-3"
                      placeholder="Option Three"
                      className="border border-black/50 rounded-sm px-2 py-2 w-full my-2 outline-none  "
                    />
                  </div>
                  <div>
                    <label htmlFor="option-4">Option Four</label> <br />
                    <input
                      type="text"
                      id="option-4"
                      placeholder="Option Four"
                      className="border border-black/50 rounded-sm px-2 py-2 w-full my-2 outline-none  "
                    />
                  </div>
                </div>
              )}
              {optionType === "file" && (
                <div className="relative">
                  <input
                    type="file"
                    id="fileInput"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    max={1}
                  />
                  <button
                    type="button"
                    className="inline-block px-4 py-2 bg-blue-700 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Upload File
                  </button>
                  <span className="ml-2"></span>
                </div>
              )}
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
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

Modal.defaultProps = defaultProps;

export default Modal;

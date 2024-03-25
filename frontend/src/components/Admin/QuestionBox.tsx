import { useEffect, useState } from "react";
import { ICON } from "@utils/icon";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TProps = {
  getQuestion: (arg0:string,arg1:string | File) => void
}


const defaultProps = {
  getQuestion : () => {}
}

const QuestionBox = (props:TProps) => {
  const {getQuestion} = props
  const [questionType, setQuestionType] = useState<string>("text");
  const questionRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionType(event.target.value);
  };
  const [questionVal, setQuestionVal] = useState<string | File>('');

  const handleQuestionFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files && event.target.files[0];
    if (file) {
      setQuestionVal(file);
    }
  };
  useEffect(()=> {
    getQuestion(questionType,questionVal)
  },[questionType,questionVal])
  return (
    <div className="p-4 md:p-5 space-y-4">
      <div className="relative">
        <label htmlFor="question" className="my-2">
          Enter Question?
        </label>
        <form className="flex items-center gap-2 my-4 ">
          <div className="flex items-center">
            <input
              disabled={(questionType === "file"  && questionVal ) as boolean}
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
            disabled={(questionType === "text" && typeof questionVal === 'string'  && questionVal.length > 15) as boolean}
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
            <ReactQuill  value={questionVal as string} onChange={setQuestionVal} />
          </div>
        )}
        {questionType === "file" && (
          <div>
            {
              !questionVal && <div className="relative">
              <input
                type="file"
                accept="image/jpeg, image/png"
                id="fileInput"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                max={1}
                onChange={handleQuestionFileChange}
              />
              <button
                type="button"
                className="inline-block px-4 py-2 bg-blue-700 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Upload File
              </button>
              <span className="ml-2"></span>
            </div>
            }
            {
              questionVal && <div className=" flex items-center justify-between group ">
              <div className="items-center space-x-5 inline-flex p-2 cursor-pointer ">
                <p className="text-lg font-semibold">
                 
                  {typeof questionVal === "string" ?  questionVal : questionVal?.name}
                </p>
              </div>
              <ICON.ImCross className="text-xl cursor-pointer text-red-700 hidden group-hover:block"  onClick={()=> setQuestionVal('')} />
            </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};


QuestionBox.defaultProps = defaultProps

export default QuestionBox;

import QuestionOptionBtn from "@components/QuestionOptionBtn";
import { useEffect, useState } from "react";

type TOptions = { id: number; value: string | File  ; select: boolean }

type TProps = {
  getOptions: (arg0: string, arg1:TOptions[]) => void
}


const defaultProps = {
  getOptions : () => {}
}

const OptionBox = (props:TProps) => {
  const {getOptions} = props
  const [nextId, setNextId] = useState(1);
  const [optionType, setOptionType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<
    TOptions[]
  >([]);

  const optionRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionType(event.target.value);
  };

  const handleAddTextOption = () => {
    if (inputValue.trim() !== "") {
      setOptions((prevOptions) => [
        ...prevOptions,
        { id: nextId, value: inputValue, select: false },
      ]);
      setInputValue("");
      setNextId((prevId) => prevId + 1);
    }
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleDeleteOption = (id: number) => {
    setOptions(prevOptions =>
      prevOptions.filter(option => option.id !== id)
        .map((option, index) => ({ ...option, id: index + 1 }))
    );
    setNextId(prevId => prevId - 1);
  };
  const handleSelectOption = (id:number) => setOptions(prev => prev.map(option => {
    if(option.id === id){
      return {
        ...option,
        select:true
      }
    }else {
      return {
        ...option,
        select:false
      }
    }
  }))

  const handleAddFileOption = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files && event.target.files[0]
    if(file){
      setOptions((prevOptions) => [
        ...prevOptions,
        { id: nextId, value: file, select: false },
      ]);
      setNextId((prevId) => prevId + 1);
    }
  }


  useEffect(()=> {
    getOptions(optionType,options)
  },[optionType,options])
  return (
    <div className="p-4 md:p-5 space-y-4">
      <label>Add option</label>
      <form className="flex items-center gap-2">
        <div className="flex items-center">
          <input
          disabled={optionType === 'file' && options.length >= 1 }
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
          disabled={optionType === 'text' && options.length >= 1 }
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
          <div className="flex flex-col gap-1">
            {options.map((option, index) => (
              <QuestionOptionBtn
                number={option.id}
                key={index}
                value={option.value }
                select={option.select}
                removeOption={id => handleDeleteOption(id)}
                getSelectedOption={id => handleSelectOption(id)}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {options.length < 4 && (
              <>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleOptionChange}
                  placeholder="Enter option"
                  className="border border-black/50 flex-grow px-2 py-2 my-2 outline-none"
                />
                <button
                  className=" border border-transparent p-2 bg-blue-700 text-white  shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  onClick={handleAddTextOption}
                >
                  Add Option
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {optionType === "file" && (
        <div>
          <div className="flex flex-col gap-1">
            {options.map((option, index) => (
              <QuestionOptionBtn
                number={option.id}
                key={index}
                value={option.value }
                select={option.select}
                removeOption={id => handleDeleteOption(id)}
                getSelectedOption={id => handleSelectOption(id)}
              />
            ))}
          </div>
          {
            options.length < 4 && <div className="relative">
            <input
              type="file"
              id="fileInput"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              max={1}
              onChange={handleAddFileOption}
            />
            <button
              type="button"
              className="inline-block px-4 py-2 bg-blue-700 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add File
            </button>
            <span className="ml-2"></span>
          </div>
          }
        </div>
      )}
    </div>
  );
};

OptionBox.defaultProps = defaultProps


export default OptionBox;

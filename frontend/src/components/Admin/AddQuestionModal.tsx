import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { RxCross1 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { useAddQuestionMutation } from "@toolkit/Exam/questionApi";
import { ISet } from "../../types/exam";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type TProps = {
  isOpen: boolean;
  modalToggle: () => void;
  singleSet: ISet;
};
const defaultProps = {
  isOpen: false,
  modalToggle: () => {},
  singleSet: {}
};

const AddQuestionModal = (props: TProps) => {
  const [mutate, {error,isError,isSuccess,data}] = useAddQuestionMutation();
  const { isOpen, modalToggle, singleSet } = props;
  const [type, setType] = useState<"reading" | "listening">("reading");
  const [descriptionTypeArr, setDescriptionTypeArr] = useState<
    ["text", "image"] | ["text", "image", "audio"] | []
  >([]);
  const [descriptionType, setDescriptionType] = useState<
    "text" | "image" | "audio"
  >("text");
  const [descriptionText, setDescriptionText] = useState("");
  const [descriptionFile, setDescriptionFile] = useState<File>();
  const [isTitleQuestion, setIsTitleQuestion] = useState(false);
  const [titleQuestion, setTitleQuestion] = useState("");
  const [optionsType, setOptionsType] = useState<"text" | "image" | "audio">(
    "text"
  );
  const [optionsFile, setOptionsFile] = useState<File[]>([]);
  const [option, setOption] = useState("");
  const [optionsText, setOptionsText] = useState<string[]>([]);
  const [answer, setAnswer] = useState(1);
  const [formErrorFromServer,setFormErrorFromServer] = useState< {[key: string] : string}  >({})
  const handleOptionsFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files?.[0];
    if (file) {
      setOptionsFile((prevFiles) => [...prevFiles, file]);
    }
  };
  const handleOptionsFileDelete = (index: number) => setOptionsFile((prev) => prev.filter((_item, i) => index !== i));
  const handleOptionsTextDelete = (index: number) => setOptionsText(prev => prev.filter((_item,i)=> index !== i))
  
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };
  const handleAddOptionText = () => {
    setOption("");
    setOptionsText((prev) => [...prev, option]);
  };
  const handleDescriptionFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setDescriptionFile(file);
    }
  };

  const handleSubmitQuestion = () => {
    const formData = new FormData();
    const mapedType: Record<string, "file" | "text"> = {
      audio: "file",
      image: "file",
      text: "text",
    };
    if (
      mapedType[optionsType] === "file" &&
      mapedType[descriptionType] === "file"
    ) {
      formData.append("type", type);
      formData.append("descriptionType", descriptionType);
      if (descriptionFile) {
        formData.append("description", descriptionFile);
      }
      formData.append("title", titleQuestion);
      for (const i in optionsFile) {
        formData.append("options", optionsFile[i]);
      }
      formData.append('optionsType',optionsType)
      formData.append("answer", answer.toString());
    }
    if (
      mapedType[optionsType] === "file" &&
      optionsFile &&
      mapedType[descriptionType] === "text"
    ) {
      formData.append("type", type);
      formData.append("descriptionType", descriptionType);
      formData.append("description", descriptionText);
      formData.append("title", titleQuestion);
      for (const i in optionsFile) {
        formData.append("options", optionsFile[i]);
      }
      formData.append('optionsType',optionsType)
      formData.append("answer", answer.toString());
    }
    if (
      mapedType[optionsType] === "text" &&
      optionsFile &&
      mapedType[descriptionType] === "text"
    ) {
      formData.append("type", type),
      formData.append("descriptionType", descriptionType);
      formData.append("description", descriptionText);
      formData.append("title", titleQuestion);
      formData.append("options", JSON.stringify(optionsText));
      formData.append('optionsType',optionsType)
      formData.append("answer", answer.toString());
    }
    if (
      mapedType[optionsType] === "text" &&
      optionsFile &&
      mapedType[descriptionType] === "file"
    ) {
      formData.append("type", type);
      formData.append("descriptionType", descriptionType);
      if (descriptionFile) {
        formData.append("description", descriptionFile);
      }
      formData.append("title", titleQuestion);
      formData.append("options", JSON.stringify(optionsText));
      formData.append('optionsType',optionsType)
      formData.append("answer", answer.toString());
    }
    mutate({setId: singleSet?._id, formData});
  };
  useEffect(() => {
    if (type === "reading") {
      setDescriptionTypeArr(["text", "image"]);
    } else if (type === "listening") {
      setDescriptionTypeArr(["text", "image", "audio"]);
    }
  }, [type]);
  useEffect(() => {
    if (isError) {
      if ("data" in error && error.data && typeof error.data === "object") {
        const errorMessage = (error.data as { message?: string })?.message;
        const errorArr = (error.data as {error: {path:string,message : string}[] })?.error
        if (errorMessage) {
          toast.error(errorMessage);
        }
        if(errorArr){
          const errorObject = errorArr.reduce(
            (acc, { path, message }) => ({ ...acc, [path]: message }),
            {}
          );
          setFormErrorFromServer(errorObject)
        }
      }
    }
  }, [isError, error]);
  
  useEffect(()=> {
    if(isSuccess && data) {
      toast.success(data?.data?.message)
      setDescriptionText('')
      setDescriptionFile(undefined)
      setOption('')
      setOptionsText([])
      setOptionsFile([])
      setFormErrorFromServer({})
      modalToggle()
    }
 
  },[isSuccess,data])
  return (
    <div
      className={` w-full lg:w-[80%] mx-auto shadow  bg-white mt-[10px] px-4 py-2 ${
        isOpen ? "block" : "hidden"
      } `}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold "> {singleSet?.name} </h2>
        <RxCross1 className="text-2xl cursor-pointer " onClick={modalToggle} />
      </div>
      <div className="my-2">
        <div>
          <h2> Question Type </h2>
        </div>
        <div className="flex gap-2">
          <button
            className={` px-8 py-2 rounded   border  text-sm basis-full md:basis-4/12 ${
              type === "reading"
                ? "bg-blue-700 text-white"
                : "bg-gray-50 text-black"
            } `}
            onClick={() => setType("reading")}
          >
            Reading
          </button>
          <button
            className={` px-8 py-2 rounded   border text-sm basis-full md:basis-4/12 ${
              type === "listening"
                ? "bg-blue-700 text-white"
                : "bg-gray-50 text-black"
            } `}
            onClick={() => setType("listening")}
          >
            Listening
          </button>
        </div>
      </div>

     <div className="flex gap-2 ">
        <input
          type="checkbox"
          id="title-question"
          onChange={(e) => setIsTitleQuestion(e.target.checked)}
          checked={isTitleQuestion}
        />
        <label
          htmlFor="title-question"
          className="cursor-pointer select-none font-normal"
        >
          Title Question
        </label>
      </div>
          <p className="text-red-500" >   {formErrorFromServer['title']}</p>
      <div className="my-2">
        <textarea
          name="title"
          className="ring-1 ring-black/50 outline-none focus:outline-none px-1 w-full resize-none "
          rows={2}
          disabled={!isTitleQuestion}
          placeholder="Title question"
          onChange={(e) => setTitleQuestion(e.target.value)}
        ></textarea>
     </div>
      <div className="my-2">
        <label> Description </label>
     <p className="text-red-500" >   {formErrorFromServer['description']}</p>
        <div className="flex gap-2 my-2">
          {descriptionTypeArr?.map((item) => (
            <button
              className={` px-8 py-2 rounded   border  text-sm basis-full md:basis-4/12 capitalize ${
                descriptionType === item
                  ? "bg-blue-700 text-white"
                  : "bg-gray-50 text-black"
              } `}
              onClick={() => setDescriptionType(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {descriptionType === "text" && (
          <ReactQuill
            theme="snow"
            value={descriptionText}
            onChange={setDescriptionText}
          />
        )}
        {descriptionType === "audio" && (
          <React.Fragment>
            {!descriptionFile && (
              <label
                className="px-4 py-2 border  flex justify-center cursor-pointer  my-2"
                htmlFor="description-file-audio"
              >
                <AiOutlinePlus className="text-xl" />
              </label>
            )}
            {descriptionFile && (
              <div className={`border p-2 rounded  relative group `}>
                <audio controls>
                  <source
                    src={URL.createObjectURL(descriptionFile)}
                    type={descriptionFile.type}
                  />
                  Your browser does not support the audio element.
                </audio>
                <RxCross1
                  onClick={() => setDescriptionFile(undefined)}
                  className="absolute top-0 right-0 text-xl cursor-pointer m-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out "
                />
              </div>
            )}
            <input
              type="file"
              accept="audio/*"
              id="description-file-audio"
              className="hidden"
              onChange={handleDescriptionFileChange}
            />
          </React.Fragment>
        )}
        {descriptionType === "image" && (
          <React.Fragment>
            {!descriptionFile && (
              <label
                className="px-4 py-2 border  flex justify-center cursor-pointer  my-2"
                htmlFor="description-file-image"
              >
                <AiOutlinePlus className="text-xl" />
              </label>
            )}
            {descriptionFile && (
              <div className={`border p-2 rounded relative group inline-flex `}>
                <img
                  src={URL.createObjectURL(descriptionFile)}
                  alt={`Preview descript file image`}
                  className=" w-[400px] object-cover rounded"
                  draggable="false"
                />
                <RxCross1
                  onClick={() => setDescriptionFile(undefined)}
                  className="absolute top-0 right-0 text-xl cursor-pointer m-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out "
                />
              </div>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id="description-file-image"
              className="hidden"
              onChange={handleDescriptionFileChange}
            />
          </React.Fragment>
        )}
      </div>

      <div className="my-2">
        <label> Options </label>
        <div className="flex gap-2 my-2">
          {descriptionTypeArr?.map((item) => (
            <button
              className={` px-8 py-2 rounded   border  text-sm basis-full md:basis-4/12 capitalize ${
                optionsType === item
                  ? "bg-blue-700 text-white"
                  : "bg-gray-50 text-black"
              } `}
              onClick={() => setOptionsType(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="text-red-500" >   {formErrorFromServer['options']}</p>
        <div className="my-2">
          {optionsType === "image" ? (
            <React.Fragment>
              <div className="flex gap-2">
                {optionsFile?.map((file, index) => (
                  <div
                    key={index}
                    className={`border p-2 rounded ${
                      answer === index + 1 ? "border-blue-700" : ""
                    } relative group `}
                    onClick={() => setAnswer(index + 1)}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded"
                      draggable="false"
                    />
                    <RxCross1
                      onClick={() => handleOptionsFileDelete(index)}
                      className="absolute top-0 right-0 text-xl cursor-pointer m-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out "
                    />
                  </div>
                ))}
              </div>
              {optionsFile?.length < 4 && (
                <label
                  className="px-4 py-2 border  flex justify-center cursor-pointer  my-2"
                  htmlFor="options-file-image"
                >
                  <AiOutlinePlus className="text-xl" />
                </label>
              )}

              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id="options-file-image"
                className="hidden"
                onChange={handleOptionsFileChange}
              />
            </React.Fragment>
          ) : optionsType === "audio" ? (
            <React.Fragment>
              <div className="flex gap-2 flex-wrap">
                {optionsFile?.map((file, index) => (
                  <div
                    key={index}
                    className={`border p-2 rounded ${
                      answer === index + 1 ? "border-blue-700" : ""
                    } relative group `}
                    onClick={() => setAnswer(index + 1)}
                  >
                    <audio controls>
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                      Your browser does not support the audio element.
                    </audio>
                    <RxCross1
                      onClick={() => handleOptionsFileDelete(index)}
                      className="absolute top-0 right-0 text-xl cursor-pointer m-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out "
                    />
                  </div>
                ))}
              </div>
              {optionsFile?.length < 4 && (
                <label
                  className="px-4 py-2 border  flex justify-center cursor-pointer  my-2"
                  htmlFor="options-file-audio"
                >
                  <AiOutlinePlus className="text-xl" />
                </label>
              )}

              <input
                type="file"
                accept="audio/*"
                id="options-file-audio"
                className="hidden"
                onChange={handleOptionsFileChange}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="grid grid-cols-2 gap-2 my-2">
                {optionsText?.map((option, i) => (
                  <div
                    className={`px-2 py-3 rounded cursor-pointer shadow relative group ${
                      answer === i + 1
                        ? "ring-blue-700 ring-1"
                        : "ring-0 bg-gray-100"
                    } `}
                    onClick={() => setAnswer(i + 1)}
                  >
                    <h2 className="text-center text-sm select-none ">
                      {option}
                    </h2>
                    <RxCross1 onClick={()=> handleOptionsTextDelete(i)} className={`absolute top-0 -right-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out `} />
                  </div>
                ))}
              </div>
              {optionsText?.length < 4 && (
                <div className="flex gap-1 my-2 ">
                  <input
                    className="py-2 px-1 outline-none border border-black/50 grow "
                    type="text"
                    placeholder="option"
                    value={option}
                    onChange={handleOptionChange}
                  />
                  <button
                    onClick={handleAddOptionText}
                    className="py-2 px-4 bg-blue-600 text-white border border-blue-600"
                  >
                    Add option
                  </button>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="my-2">
        <button
          onClick={handleSubmitQuestion}
          className="w-full bg-blue-700 text-white hover:to-blue-600 py-2 rounded "
        >
          Submit
        </button>
      </div>
      <Toaster  position="top-right" />
    </div>
  );
};

AddQuestionModal.defaultProps = defaultProps;

export default AddQuestionModal;

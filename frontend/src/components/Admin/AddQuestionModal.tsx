import React, { useEffect, useState } from "react";


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
  setId: "",
};

const AddQuestionModal = (props: TProps) => {
  const [mutate] = useAddQuestionMutation();
  const { isOpen, modalToggle, singleSet } = props;
  const [title, setTitle] = useState<"reading" | "listening">("reading");
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
  const [optionsText,setOptionsText] = useState<string[]>([])
  const [answer, setAnswer] = useState(1);

  const handleSubmitQuestion = () => {
    const formData = new FormData();
    formData.append("addQuestionType", activeTab);
    formData.append("questionType", question.type);
    formData.append("titleQuestion", titleQuestion),
      formData.append("optionsType", options.type);
    formData.append("question", question.question);
    for (let i in options.options) {
      formData.append(`option${Number(i) + 1}`, options.options[i].value);
    }
    const correctId = options?.options?.find((option) => option.select)
      ?.id as unknown as string;
    formData.append("answer", correctId);
    mutate({ setId, formData });
  };

  const handleOptionsFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files?.[0];
    if (file) {
      setOptionsFile((prevFiles) => [...prevFiles, file]);
    }
  };
  const handleoptionsFileDelete = (index: number) => {
    setOptionsFile((prev) => prev.filter((_item, i) => index !== i));
  };
  const handleDescriptionFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setDescriptionFile(file);
    }
  };
  useEffect(() => {
    if (title === "reading") {
      setDescriptionTypeArr(["text", "image"]);
    } else if (title === "listening") {
      setDescriptionTypeArr(["text", "image", "audio"]);
    }
  }, [title]);
  return (
    <div
      className={` md:w-[80%] mx-auto shadow  bg-white mt-[10px] px-4 py-2 ${
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
              title === "reading"
                ? "bg-blue-700 text-white"
                : "bg-gray-50 text-black"
            } `}
            onClick={() => setTitle("reading")}
          >
            Reading
          </button>
          <button
            className={` px-8 py-2 rounded   border text-sm basis-full md:basis-4/12 ${
              title === "listening"
                ? "bg-blue-700 text-white"
                : "bg-gray-50 text-black"
            } `}
            onClick={() => setTitle("listening")}
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
      <div className="my-2">
        <textarea
          name="title"
          className="ring-1 ring-black/50 outline-none focus:outline-none px-1 w-full resize-none "
          rows={2}
          disabled={!isTitleQuestion}
          placeholder="Title question"
        ></textarea>
      </div>
      <div className="my-2">
        <label> Description </label>
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
                htmlFor="options-file"
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
              id="options-file"
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
                htmlFor="options-file"
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
              id="options-file"
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
                      onClick={() => handleoptionsFileDelete(index)}
                      className="absolute top-0 right-0 text-xl cursor-pointer m-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out "
                    />
                  </div>
                ))}
              </div>
              {optionsFile?.length < 4 && (
                <label
                  className="px-4 py-2 border  flex justify-center cursor-pointer  my-2"
                  htmlFor="options-file"
                >
                  <AiOutlinePlus className="text-xl" />
                </label>
              )}

              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id="options-file"
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
                      onClick={() => handleoptionsFileDelete(index)}
                      className="absolute top-0 right-0 text-xl cursor-pointer m-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out "
                    />
                  </div>
                ))}
              </div>
              {optionsFile?.length < 4 && (
                <label
                  className="px-4 py-2 border  flex justify-center cursor-pointer  my-2"
                  htmlFor="options-file"
                >
                  <AiOutlinePlus className="text-xl" />
                </label>
              )}

              <input
                type="file"
                accept="audio/*"
                id="options-file"
                className="hidden"
                onChange={handleOptionsFileChange}
              />
            </React.Fragment>
          ) : null}
        </div>
      </div>
      <div className="my-2">
        <button className="w-full bg-blue-700 text-white hover:to-blue-600 py-2 rounded ">
          Submit
        </button>
      </div>
    </div>
  );
};

AddQuestionModal.defaultProps = defaultProps;

export default AddQuestionModal;

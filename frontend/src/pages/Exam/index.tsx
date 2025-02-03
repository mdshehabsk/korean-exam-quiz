import { useGetAllSetQuery } from "@toolkit/Exam/setApi";

import { useLazyGetSingleSetQuery } from "@toolkit/Exam/setApi";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@toolkit/hook";
import { handleCurrentCachedSet } from "@toolkit/Exam/setSlice";
import { useRef, useState } from "react";
import React from "react";
const Exam = () => {
  const [isTakeExamModal, setIsTakeExamModal] = useState(false);
  const progressRef = useRef<HTMLHeadingElement>(null);
  const totalSizeRef = useRef<HTMLSpanElement>(null);
  const loadedSizeRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: allSet } = useGetAllSetQuery(undefined);
  const [trigger] = useLazyGetSingleSetQuery();

  const progress = { totalSize: 0, downloadedSize: 0 };

  async function fetchWithProgress(url: string): Promise<string> {
    const response = await fetch(url);
    const contentLength = response.headers.get("content-length");

    if (contentLength) {
      progress.totalSize += parseInt(contentLength, 10);
    }

    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);

      progress.downloadedSize += value.length;

      if (progressRef.current) {
        progressRef.current.style.width = ` ${(
          (progress.downloadedSize / progress.totalSize) *
          100
        ).toFixed(2)}%  `;
      }
      if (loadedSizeRef.current) {
        loadedSizeRef.current.innerText = `${(
          progress.downloadedSize /
          (1024 * 1024)
        ).toFixed(2)} MB`;
      }
      if (totalSizeRef.current) {
        totalSizeRef.current.innerText = `${(
          progress.totalSize /
          (1024 * 1024)
        ).toFixed(2)} MB`;
      }
    }

    const blob = new Blob(chunks);
    return URL.createObjectURL(blob);
  }

  async function handleTakeExam(id: string) {
    const { data } = await trigger(id).unwrap();
    const mappedTyped = {
      audio: "file",
      image: "file",
      text: "text",
    };

    const updatedData = await Promise.all(
      data?.questions?.map(async (item) => {
        // Fetch description if it's a file
        let newDescription: string | Blob = item.description;
        if (mappedTyped[item.descriptionType] === "file") {
          newDescription = await fetchWithProgress(item.description);
        }

        // Fetch all options if optionsType is "file"
        let newOptions: string[] | Blob[] = item.options;
        if (mappedTyped[item.optionsType] === "file") {
          newOptions = await Promise.all(
            (newOptions = await Promise.all(
              item.options.map(fetchWithProgress)
            ))
          );
        }

        // Return updated question object
        return { ...item, description: newDescription, options: newOptions };
      })
    );
    const newSet = {
      ...data,
      questions: updatedData,
    };
    dispatch(handleCurrentCachedSet(newSet));
    navigate(`/set/prefetch`);
  }

  return (
    <React.Fragment>
      <div className="flex flex-wrap min-h-lvh w-full  ">
        <div className="basis-full md:basis-6/12 lg:basis-4/12  p-8 flex flex-wrap gap-2  ">
          {allSet?.data?.map((elem, index) => (
            <div
              key={index}
              className=" self-start grow p-6 bg-white border border-gray-200 rounded-lg shadow  "
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {elem.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {elem?.description}
              </p>
              <button
                onClick={() => setIsTakeExamModal(true)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:scale-105 transition-all focus:outline-none "
              >
                Take Exam
              </button>
              {isTakeExamModal && (
                <div className="w-screen h-screen bg-black/35 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                  <div className=" py-20 w-full md:w-[80%] lg:w-[50%] mx-auto shadow-md fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-slate-50">
                    <h2 className="text-center font-bold text-2xl" > {elem.name} </h2>
                    <div className="px-5">
                      <div className="flex justify-between">
                        <span ref={loadedSizeRef}></span>
                        <span ref={totalSizeRef}></span>
                      </div>
                      <div className="flex w-full h-[20px] ">
                        <div
                          className=" h-full  bg-green-600  text-sm text-white text-end "
                          ref={progressRef}
                        >
                          {" "}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-5 my-2 h-full">
                      <button
                        className="px-8 w-[200px] py-2 bg-green-600 text-white rounded-full text-2xl "
                        onClick={() => handleTakeExam(elem._id)}
                      >
                        Start Exam
                      </button>
                      <button
                        className="px-8 w-[200px] py-2 bg-red-600 text-white rounded-full text-2xl"
                        onClick={() => setIsTakeExamModal(false)}
                      >
                        Exit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Exam;

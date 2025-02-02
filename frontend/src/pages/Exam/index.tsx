import { useGetAllSetQuery } from "@toolkit/Exam/setApi";
import { IMAGE } from "@utils/image";
import { useLazyGetSingleSetQuery } from "@toolkit/Exam/setApi";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@toolkit/hook";
import { handleCurrentCachedSet } from "@toolkit/Exam/setSlice";
const Exam = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { data: allSet } = useGetAllSetQuery(undefined);
  const [trigger] = useLazyGetSingleSetQuery();

  async function handleTakeExam(id: string) {
    const { data } = await trigger(id).unwrap();
    const mappedTyped = {
      audio: "file",
      image: "file",
      text: "text",
    };

  const updatedData =  await Promise.all(
      data?.questions?.map(async (item) => {
        // Fetch description if it's a file
        let newDescription: string | Blob = item.description;
        if (mappedTyped[item.descriptionType] === "file") {
          const response = await fetch(item.description);
          newDescription = URL.createObjectURL(await response.blob());
        }

        // Fetch all options if optionsType is "file"
        let newOptions: string[] | Blob[] = item.options;
        if (mappedTyped[item.optionsType] === "file") {
          newOptions = await Promise.all(
            item.options.map(async (option) => {
              const response = await fetch(option);
              const fileBlob = URL.createObjectURL(await response.blob());
              return fileBlob;
            })
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
    dispatch(handleCurrentCachedSet(newSet))
    navigate(`/set/prefetch`);
  }

  return (
    <>
      <div className="flex flex-wrap min-h-lvh w-full  ">
        <div className="basis-5/12 hidden md:block ">
          <img
            className="h-full w-full object-cover"
            src={IMAGE.koreanExam}
            alt="image description"
          />
        </div>
        <div className="basis-full md:basis-6/12  p-8 flex flex-wrap gap-2 grow ">
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
              {/* <img src={URL.createObjectURL(blob?.[0]?.description)} alt="" /> */}
              {/* <Link
                to={`/set/${elem._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:scale-105 transition-all focus:outline-none "
                state={{name:'md shehab'}}
              >
                Take Exam
              </Link> */}
              <button
                onClick={() => handleTakeExam(elem?._id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:scale-105 transition-all focus:outline-none "
              >
                Take Exam
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exam;

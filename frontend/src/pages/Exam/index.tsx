import { useGetAllSetQuery } from "@toolkit/Exam/setApi";
import { IMAGE } from "@utils/image";
import { Link } from "react-router-dom";

const index = () => {
  const {data:allSet} = useGetAllSetQuery(undefined)
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
          {allSet?.data?.map((elem ,index)=> <div key={index} className=" self-start grow p-6 bg-white border border-gray-200 rounded-lg shadow  ">
           
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {elem.name}
              </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {elem?.description}
            </p>
            <Link
              to={`/set/${elem._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:scale-105 transition-all focus:outline-none "
            >
              Take Exam
              
            </Link>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default index;

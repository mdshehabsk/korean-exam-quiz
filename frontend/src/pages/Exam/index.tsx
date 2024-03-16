import { IMAGE } from "@utils/image";

const index = () => {
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
        <div className="basis-full md:basis-6/12 grow p-8 flex flex-wrap gap-2 ">
          {new Array(7).fill(undefined).map(_elem => <div className="  grow p-6 bg-white border border-gray-200 rounded-lg shadow  ">
           
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Set-1
              </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Lorem ipsum dolor sit amet.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:scale-105 transition-all focus:outline-none "
            >
              Take Exam
              
            </a>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default index;

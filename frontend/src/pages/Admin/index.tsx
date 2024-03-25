import { Link } from "react-router-dom";
import AddSetModal from "@components/Admin/AddSetModal";
import { useState } from "react";
import { useGetAllSetQuery } from "@toolkit/Exam/setApi";
const index = () => {
  const [isModal, setIsModal] = useState(false);

  const modalToggle = () => {
    setIsModal(!isModal);
  };
  const { data } = useGetAllSetQuery(undefined);
  return (
    <div className="relative">
      <div className="flex bg-white my-3 p-3  ">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800  px-6 py-3 font-medium text-md "
          onClick={modalToggle}
        >
          Add New Set
        </button>
      </div>
      <div className=" w-full  grid grid-cols-2 lg:grid-cols-3 gap-2  ">
        {data?.data?.map((elem) => (
          <div className="  p-6 bg-white border border-gray-200 rounded-lg shadow  ">
            <h5 className=" capitalize mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {elem.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {elem.description}
            </p>
            <Link
              to={`/admin/set/3`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700  hover:bg-green-800 focus:scale-105 transition-all focus:outline-none "
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
      <AddSetModal isOpen={isModal} modalToggle={modalToggle} />
    </div>
  );
};

export default index;

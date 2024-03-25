import Questions from "@components/Questions";
import AddQuestionModal from '@components/Admin/AddQuestionModal'
import { useGetAllSetQuery, useGetSingleSetQuery } from "@toolkit/Exam/setApi";
import React, { useState } from "react";
const index = () => {
  const [setId,setSetId] = useState('')
  const {data:allSet} = useGetAllSetQuery(undefined)
  const { data : singleSet } = useGetSingleSetQuery(setId , {skip: !setId});
  const [isModal,setIsModal] = useState(false)

  const modalToggleFunc = () => {
    setIsModal(!isModal)
  }

  const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSetId(event.target.value)
  }
  return (
    <div className="relative" >
      <div className="px-9 py-2 bg-blue-700">
        <h2 className="text-xl text-white">Add Question</h2>
      </div>
      <div className="my-4">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a set
        </label>
        <select
        onChange={handleSelectChange}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option defaultChecked>Choose a set</option>
          {
            allSet?.data?.map((set,index) => <option key={index} value={set._id} > {set.name} </option> )
          }
        </select>
      </div>

      <div>
        {singleSet && (
          <div className="exam-questions">
            <Questions set={singleSet?.data} footer={false} />
            <div className="flex justify-center py-4 bg-white">
              <button
              onClick={modalToggleFunc}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-3 text-center w-4/12 "
              >
                Add Question
              </button>
            </div>
          </div>
        )}
      </div>

      <AddQuestionModal setId={setId} isOpen={isModal} modalToggle={modalToggleFunc} />
    </div>
  );
};

export default index;

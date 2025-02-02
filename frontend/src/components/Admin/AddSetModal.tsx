
import { useCreateNewSetMutation } from "@toolkit/Admin/adminApi";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
type TProps = {
  isOpen: boolean;
  modalToggle: () => void;
};
const defaultProps = {
  isOpen: false,
  modalToggle: () => {},
};

const AddSetModal = (props: TProps) => {
  const [setValue, setSetValue] = useState({
    name: "",
    description: "",
  });
  const [formErrorFromServer, setFormErrorFromServer] = useState<{
    [key: string]: string;
  }>({});
  const [mutate, { isSuccess, error, isError }] = useCreateNewSetMutation();
  const { isOpen, modalToggle } = props;
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSetValue({
      ...setValue,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      setSetValue({ name: "", description: "" });
      modalToggle();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError && "data" in error && error.data && typeof error.data === "object") {
      const errorMessage = (error.data as { message?: string })?.message;
      const errorArr = (
        error.data as { error: { path: string; message: string }[] }
      )?.error;
      if (errorMessage) {
        toast.error(errorMessage);
      }
      if(errorArr) {
        const errObj = errorArr?.reduce((acc,{path,message}) => ({...acc, [path] : message}) , {} )
        setFormErrorFromServer(errObj)
      }
    }
  }, [isError, error]);
  const handleSubmitSet = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(setValue);
  };
  const { description, name } = setValue;

  return (
    <div
      className={` w-full h-screen absolute  ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center top-0 left-0 right-0  bg-slate-300/50`}
    >
      <div className="w-[700px]  overflow-y-auto max-h-[600px] ">
        <div className="relative  p-4 w-full  max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Set
              </h3>
              <button
                onClick={modalToggle}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmitSet} autoComplete="off">
              <div className="px-4 py-2">
       
                <label htmlFor="name">Set Name:</label> <br />
                <input
                  value={name}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Set-1"
                  className="w-full border border-black/50 outline-none my-2 p-2"
                />
              <p className="text-red-500"  > {formErrorFromServer['name']}</p>
              </div>
              <div className="px-4 py-2">
                <label htmlFor="description">Set Description:</label> <br />
                <textarea
                  onChange={handleInputChange}
                  value={description}
                  name="description"
                  id="description"
                  placeholder="Enter Description..."
                  className="w-full border border-black/50 outline-none my-2 p-2"
                  />
           <p className="text-red-500" >  {formErrorFromServer['description']}</p>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                <button
                  onClick={handleSubmitSet}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800  font-medium w-full text-sm px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

AddSetModal.defaultProps = defaultProps;

export default AddSetModal;

import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
type TProps = {
  children: React.ReactNode | string
  number: number;
  getSelectedOption?: React.Dispatch<number>;
  select: boolean;
 correct : boolean
};




const QuestionOptionBtn = (props: TProps) => {
  const { children, number, getSelectedOption = () => {}, select , correct = false} = props;
  return (
    <div className=" flex items-center justify-between ">
      <div className="items-center space-x-5 inline-flex p-2 cursor-pointer ">
        <button
          onClick={() => getSelectedOption(number)}
          type="button"
          className={`${
            select 
              ? "bg-green-700 text-white"
              : "border border-green-700 text-black"
          }  rounded-full w-[45px] h-[45px]  text-center text-xl `}
        >
          {number}
        </button>
        <p>{children}</p>
      </div>
      {correct && <AiOutlineCheck className="text-4xl text-green-500" />}
    </div>
  );
};




export default QuestionOptionBtn;

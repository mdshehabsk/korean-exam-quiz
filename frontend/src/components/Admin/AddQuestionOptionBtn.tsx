import { ICON } from "@utils/icon";
import React from "react";

type TProps = {
  value: string | File;
  number: number;
  getSelectedOption?: React.Dispatch<number>;
  select: boolean;
  removeOption?: React.Dispatch<number>
};


const defaultProps = {
  value: '',
  number: null,
  getSelectedOption: () => {},
  select: false,
  removeOption: null,
}

const AddQuestionOptionBtn = (props: TProps) => {
  const { value, number, getSelectedOption = () => {}, select,removeOption } = props;
  return (
    <div className=" flex items-center justify-between group ">
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
        <p className="text-lg font-semibold"> { typeof value === 'string' ? value : value.name } </p>
      </div>
      {removeOption && <ICON.ImCross className="text-xl cursor-pointer text-red-700 hidden group-hover:block" onClick={()=> removeOption(number)} />}
    </div>
  );
};

AddQuestionOptionBtn.defaultProps = defaultProps


export default AddQuestionOptionBtn;

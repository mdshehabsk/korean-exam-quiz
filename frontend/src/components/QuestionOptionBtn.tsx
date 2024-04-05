import React from "react";

type TProps = {
  children: JSX.Element[] | JSX.Element | string
  number: number;
  getSelectedOption?: React.Dispatch<number>;
  select: boolean;
};


const defaultProps = {
  number: null,
  getSelectedOption: () => {},
  select: false,
}

const QuestionOptionBtn = (props: TProps) => {
  const { children, number, getSelectedOption = () => {}, select } = props;
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
        <p>{children}</p>
      </div>
    </div>
  );
};

QuestionOptionBtn.defaultProps = defaultProps


export default QuestionOptionBtn;

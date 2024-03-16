import React from "react";
import { useDispatch } from "react-redux";

type TProps = {
  children: JSX.Element | any;
  onClick : React.MouseEventHandler<HTMLButtonElement>
};

const QuestionBtn: React.FC<TProps> = ({ children,onClick }) => {


 return (
  <button
  onClick={onClick}
    type="button"
    className="text-blue-700  border border-blue-700  focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    {children}
  </button>
 )
}

export default QuestionBtn;

import React from "react";
type TProps = {
  children: JSX.Element | any;
  onClick : React.MouseEventHandler<HTMLButtonElement>
  select: boolean
};

const defaultProps = {
  onClick : () => {},
  select:false
}

const QuestionBtn: React.FC<TProps> = ({ children,onClick,select }) => {


 return (
  <button
  onClick={onClick}
    type="button"
    className={` ${select ? ' text-white bg-blue-500' : 'text-blue-700 border-blue-700  '}   border  focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2`}
  >
    {children}
  </button>
 )
}


QuestionBtn.defaultProps = defaultProps

export default QuestionBtn;

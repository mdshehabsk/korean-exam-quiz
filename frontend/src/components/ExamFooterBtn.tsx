import React from "react";

type TProps = {
  children: string;
  color: "red" | "blue" | "green" | "yellow";
};

const ExamFooterBtn: React.FC<TProps> = ({ children, color }) => {
  return (
    <button
      type="button"
      className={` exam-footer-btn bg-${color}-700 `}
    >
      {children}
    </button>
  );
};

export default ExamFooterBtn;

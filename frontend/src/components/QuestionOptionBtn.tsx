


type TProps = {
    value: string,
    number:string
}

const QuestionOptionBtn = (props:TProps) => {
    const {value,number} = props
    const select = false;
  return (
    <div className=" items-center space-x-5 inline-flex p-2 cursor-pointer ">
    <button
      type="button"
      className={`${
        select
          ? "bg-green-700 text-white"
          : "border border-green-700 text-black"
      }  rounded-full w-[45px] h-[45px]  text-center text-xl `}
    >
      {number}
    </button>
    <p className="text-lg font-semibold"> {value} </p>
  </div>
  )
}

export default QuestionOptionBtn
import React from "react"
import QuestionBtn from "./QuestionBtn"
import { ISetListening, ISetReading } from "@toolkit/Exam/ExamApi"

type TProps  ={
    questionLogo: string,
    questionArr: ISetReading[] | ISetListening[],
    questionType: string
}

const defaultProps = {
    questionArr : new Array(20).fill(2)
}

const QuestionCard : React.FC<TProps> = ({questionArr,questionLogo,questionType}) => {
    console.log(questionArr)
  return (
    <div className="bg-gray-100 p-3 max-w-[350px] w-full " >
        <div className="flex p-2 items-center gap-2 justify-center " >
            <img className="max-w-[30px]" src={questionLogo} alt="no image" />
            <p className="text-lg" > {questionType} </p>
            <h3 className="font-semibold text-2xl" > (Question:20) </h3>
        </div>
        <div className=" grid grid-cols-4 my-3 gap-2 ">
            
        </div>
    </div>
  )
}





QuestionCard.defaultProps = defaultProps
export default QuestionCard
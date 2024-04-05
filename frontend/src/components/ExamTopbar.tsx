import  { useState } from 'react'
import ExamTopbarBtn from './ExamTopbarBtn'
interface Time {
  minutes: number;
  seconds: number;
}
interface IProps {
  solved:number,
  unsolved: number,
  time :Time
}

const ExamTopbar : React.FC<IProps> = ({solved,unsolved,time}) => {
  return (
    <div className="exam--topbar  ">
    <div className="container py-3 bg-white">
      <div className="flex flex-wrap lg:flex-nowrap justify-center  lg:gap-4 ">
        <ExamTopbarBtn>User: SHEHAB</ExamTopbarBtn>
        <ExamTopbarBtn>Total Question: 40</ExamTopbarBtn>
        <ExamTopbarBtn>Solved Question: {solved} </ExamTopbarBtn>
        <ExamTopbarBtn>Unsolved Question: {unsolved} </ExamTopbarBtn>
        <ExamTopbarBtn>
          {time.minutes + ":" + time.seconds}
        </ExamTopbarBtn>
      </div>
    </div>
  </div>
  )
}

export default ExamTopbar
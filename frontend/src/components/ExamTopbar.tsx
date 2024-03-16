import  { useState } from 'react'
import ExamTopbarBtn from './ExamTopbarBtn'

const ExamTopbar = () => {
    const initialTime = { minutes: 1, seconds: 0 };
    const [time] = useState(initialTime);
  return (
    <div className="exam--topbar  ">
    <div className="container py-3 bg-white">
      <div className="flex flex-wrap lg:flex-nowrap justify-center  lg:gap-4 ">
        <ExamTopbarBtn>User: SHEHAB</ExamTopbarBtn>
        <ExamTopbarBtn>Total Question: 40</ExamTopbarBtn>
        <ExamTopbarBtn>Solved Question: 20</ExamTopbarBtn>
        <ExamTopbarBtn>Unsolved Question: 20</ExamTopbarBtn>
        <ExamTopbarBtn>
          {time.minutes + ":" + time.seconds}
        </ExamTopbarBtn>
      </div>
    </div>
  </div>
  )
}

export default ExamTopbar
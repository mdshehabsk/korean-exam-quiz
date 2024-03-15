

import { useEffect, useState } from "react";
import ExamTopbarBtn from "../../components/ExamTopbarBtn";
import QuestionCard from "../../components/QuestionCard";
import { LOGO } from "../../utils/logo";
import { useGetSingleSetQuery } from "@toolkit/Exam/ExamApi";

const index = () => {
  const {data} =  useGetSingleSetQuery(undefined)

    const initialTime = { minutes: 1, seconds: 0 };
  const [time] = useState(initialTime);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime(prevTime => {
  //       if (prevTime.seconds === 0) {
  //         if (prevTime.minutes === 0) {
  //           clearInterval(timer);
  //           // Timer has reached 0
  //           alert("Time's up!");
  //           return initialTime;
  //         } else {
  //           return { minutes: prevTime.minutes - 1, seconds: 59 };
  //         }
  //       } else {
  //         return { ...prevTime, seconds: prevTime.seconds - 1 };
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <>
      <div>
        <div className="exam--navbar  ">
          <div className="container py-3 bg-white">
            <div className="flex flex-wrap lg:flex-nowrap justify-center  lg:gap-4 ">
              <ExamTopbarBtn>User: SHEHAB</ExamTopbarBtn>
              <ExamTopbarBtn>Total Question: 40</ExamTopbarBtn>
              <ExamTopbarBtn>Solved Question: 20</ExamTopbarBtn>
              <ExamTopbarBtn>UnSolved Question: 20</ExamTopbarBtn>
              <ExamTopbarBtn>
                {time.minutes + ":" + time.seconds}
              </ExamTopbarBtn>
            </div>
          </div>
        </div>
        <div className="exam--question">
          <div className="container bg-white py-3 ">
            <div className="flex flex-wrap justify-center gap-2 ">
              <QuestionCard
                questionLogo={LOGO.reading}
                questionType="Reading" 
                questionArr={data?.data?.reading || []}
                />
              <QuestionCard
                questionLogo={LOGO.listening}
                questionType="Listening"
                questionArr={data?.data?.listening || []}
                />
            </div>
          </div>
        </div>
        <div className="exam--footer ">
          <div className="container bg-white flex flex-wrap justify-center lg:justify-end py-3 ">
            <button type="button"  className="exam-footer-btn bg-blue-700 hover:bg-blue-800" >Previous</button >
            <button type="button"  className="exam-footer-btn bg-yellow-700 hover:bg-yellow-800" >Total</button >
            <button type="button"  className="exam-footer-btn bg-red-700 hover:bg-red-800" >Next</button >
            <button type="button"  className="exam-footer-btn bg-green-700 hover:bg-green-800" >Submit</button >
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

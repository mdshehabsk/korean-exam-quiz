import ExamFooterBtn from "../../components/ExamFooterBtn";
import ExamTopbarBtn from "../../components/ExamTopbarBtn";
import QuestionCard from "../../components/QuestionCard";
import { LOGO } from "../../utils/logo";

const index = () => {
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
              <ExamTopbarBtn>50:00</ExamTopbarBtn>
            </div>
          </div>
        </div>
        <div className="exam--question">
          <div className="container bg-white py-3 ">
            <div className="flex flex-wrap justify-center gap-2 ">
              <QuestionCard
                questionLogo={LOGO.reading}
                questionType="Reading" />
              <QuestionCard
                questionLogo={LOGO.listening}
                questionType="Listening" />
            </div>
          </div>
        </div>
        <div className="exam--footer ">
          <div className="container bg-white flex justify-end py-3 ">
            <ExamFooterBtn color="blue">Previous</ExamFooterBtn>
            <ExamFooterBtn color="yellow">Total</ExamFooterBtn>
            <ExamFooterBtn color="red">Next</ExamFooterBtn>
            <ExamFooterBtn color="green">Submit</ExamFooterBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

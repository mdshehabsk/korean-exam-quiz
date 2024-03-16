import { ISet } from "../types/exam";
import QuestionsCard from "./QuestionsCard";
import { LOGO } from "@utils/logo";


type TProps = {
    set: ISet
}

const Questions = (props:TProps) => {
    const {set} = props
    
  return (
    <div className="exam--question">
      <div className="container bg-white py-3 ">
        <div className="flex flex-wrap justify-center gap-2 ">
          <QuestionsCard
            questionLogo={LOGO.reading}
            questionType="Reading"
            questionArr={set?.questions?.filter(question => question.type === 'reading') || []}
          />
          <QuestionsCard
            questionLogo={LOGO.listening}
            questionType="Listening"
            questionArr={set?.questions?.filter(question => question.type === 'listening') || []}

          />
        </div>
      </div>
      <div className="exam--footer ">
        <div className="container bg-white flex flex-wrap justify-center lg:justify-end py-3 ">
          <button
            type="button"
            className="exam-footer-btn bg-green-700 hover:bg-green-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;

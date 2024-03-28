import {  ISetQuestion } from "../types/exam"
import { useAppDispatch } from "@toolkit/hook";
import { getCurrentQuestion, reset } from "@toolkit/Exam/examSlice";


type TProps = {
  currentQuestion: ISetQuestion,
  questions: ISetQuestion[],
  submitBtn: boolean
}



const defaultProps = {
  currentQuestion: {},
  Question: [],
  submitBtn: true
}

const Question = (props:TProps) => {
  const {currentQuestion,questions,submitBtn} = props
  const dispatch = useAppDispatch()
  const prevQuestionFn = () => {
    const newQuestion = questions?.find(question => Number(question.questionId ) === Number(currentQuestion.questionId ) - 1)
    dispatch(getCurrentQuestion(newQuestion))
  }

  const nextQuestionFn = () => {
    const newQuestion = questions?.find(question => Number(question.questionId ) === Number(currentQuestion.questionId ) + 1)
    dispatch(getCurrentQuestion(newQuestion))
  }
  const totalQuestionFn = () => dispatch(reset())

  const playAudio = (audioLink:string) => {
    const audio = new Audio(`http://localhost:5000/${audioLink}`)

    let playCount = 0;
      audio.addEventListener('ended', function() {
        playCount++;
        if (playCount < 2) {
          setTimeout(function() {
            audio.play();

          }, 500); // Delay of 500 milliseconds
        }
      });
      
      audio.play();
  }
  return (
    <div className="w-full">
      <div className="my-5">
        <h1 className="text-xl">
        {currentQuestion?.questionId}. {currentQuestion?.titleQuestion}
        </h1>
      </div>
      <div className="flex flex-wrap justify-center w-full ">
        <div className="basis-full md:basis-5/12   ">
          <div className="flex items-center justify-center w-full h-full" >
            {/* <img src={IMAGE.koreanExam} alt="no image" /> */}
          {
            currentQuestion?.question?.type === 'text' && <div dangerouslySetInnerHTML={{__html:currentQuestion?.question?.value}} ></div>
          }
          </div>
        </div>
        <div className="basis-full md:basis-5/12  ">
          <div className="p-2  md:p-8 ">
            <div className="flex flex-col justify-center items-center">
            {/* <QuestionOptionBtn number='1' value='고르십시오'  />  */}

              {/* {
                currentQuestion?.options?.map(option =>  <QuestionOptionBtn  key={option.id} number={Number(option.id)} value={option.value}  /> )
              } */}
              {currentQuestion?.options?.map(option => {
                if(option.type === 'audio') {
                  return (
                    <button className="p-3 bg-green-700 text-white m-3" onClick={()=> playAudio(option.value)} >Play audio</button>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="exam--footer ">
          <div className="container bg-white flex flex-wrap justify-center lg:justify-end my-4 ">
           <button type="button"  className="exam-footer-btn bg-blue-700 hover:bg-blue-800" onClick={prevQuestionFn}  disabled={currentQuestion.questionId <= questions[0].questionId} >Previous</button >
            
            <button type="button"  className="exam-footer-btn bg-yellow-700 hover:bg-yellow-800"  onClick={totalQuestionFn} >Total</button >
            <button type="button"  className="exam-footer-btn bg-red-700 hover:bg-red-800" onClick={nextQuestionFn} disabled={currentQuestion.questionId >= questions[questions.length - 1].questionId }  >Next</button >
           {
            submitBtn &&  <button type="button"  className="exam-footer-btn bg-green-700 hover:bg-green-800" >Submit</button >
           }
          </div>
        </div>
    </div>
  );
};


Question.defaultProps = defaultProps

export default Question;

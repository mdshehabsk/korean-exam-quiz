import React, { useEffect, useState } from "react";
import Switch from "./Switch";


type TProps = {
  getTitleQuestionValue : (arg0:string) => void
}


const defaultProps = {
  getTitleQuestionValue : () => {}
}

const TitleQuestionBox = (props:TProps) => {
  const {getTitleQuestionValue} = props
  const [titleQuestion, setTitleQuestion] = useState(false);
  const [titleQuestionVal,setTitleQuestionVal] = useState('')

  const handleTitleQuestionChange = (event:React.ChangeEvent<HTMLInputElement>) => setTitleQuestionVal(event.target.value)

  useEffect(()=> {
    getTitleQuestionValue(titleQuestionVal)
  },[titleQuestionVal])
  return (
    <div className="p-4">
      <Switch
        isOn={titleQuestion}
        switchToggle={(value) => setTitleQuestion(value)}
      />
      {titleQuestion && (
        <div className="my-2" >
          <input type="text" placeholder="Enter Title Question" className="w-full border border-black/50 p-2 outline-none"  onChange={handleTitleQuestionChange} />
        </div>
      )}
    </div>
  );
};


TitleQuestionBox.defaultProps = defaultProps

export default TitleQuestionBox;

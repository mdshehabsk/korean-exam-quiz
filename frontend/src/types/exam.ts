
export interface IOption {
    id:number,
    type:string
    value:string
    select?: boolean
}

export interface ISetQuestion {
    select: boolean
    questionId: number
    questionType:string,
    titleQuestion?: string,
    question : {type:string,value:string},
    answer: number,
    options : IOption[]
}

export interface ISet {
    _id:string;
    name:string,
    description:string,
    questions: ISetQuestion[]
}

export interface ISubmitQuestionsData {
    questionId: number;
    optionId: number;
  }
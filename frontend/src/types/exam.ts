
export interface IOption {
    id:number,
    type:string
    value:string
    select?: boolean
}

export interface ISetQuestion {
    _id: string
    type:string,
    title?: string,
    descriptionType: 'text' | 'image' | 'audio'
    description : string,
    answer: number,
    optionsType: 'text' | 'image' | 'audio'
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
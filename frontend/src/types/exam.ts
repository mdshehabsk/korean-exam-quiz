


export interface ISetQuestion {
    _id: string
    type: 'reading' | 'listening',
    title?: string,
    descriptionType: 'text' | 'image' | 'audio'
    description : string,
    answer: number,
    optionsType: 'text' | 'image' | 'audio'
    options : string[] ,
    number?: number
}

export interface ISet {
    _id:string;
    name:string,
    description:string,
    status : 'publish' | 'draft'
    questions: ISetQuestion[]
}

export interface ISubmitQuestionsData {
    questionId: number;
    optionId: number;
  }
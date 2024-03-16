

export interface ISetQuestions{
    type:string
    id:string
    question : string
    answer: number
    options : {
        id:string
        value:string
    }[]
}


export interface ISet {
    name:string,
    description:string,
    questions: ISetQuestions[]
}
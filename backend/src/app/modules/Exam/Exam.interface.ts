
export interface ISetQuestion {
    questionId: number
    questionType:string,
    titleQuestion?: string,
    question : {type:string,value:string},
    answer: number,
    options : {
        id:number
        type:string
        value:string
    }[]
}


export interface ISet {
    name:string,
    description:string,
    questions:ISetQuestion[],
}

export interface IExamReading {
    question : string,
    answer: number,
    options : {
        id:string,
        value:string
    }[]
}

export interface IExamListening {
    question: string,
    answer: number,
    option: {
        id:string,
        value:string
    }[]
}

export interface IExam {
    name:string,
    description:string,
    reading:IExamReading[],
    listening: IExamListening[]
}
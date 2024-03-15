import baseApi from '@toolkit/utils/baseApi'


export interface ISetReading {
    question : string,
    answer: number,
    options : {
        id:string,
        value:string
    }[]
}

export interface ISetListening {
    question: string,
    answer: number,
    option: {
        id:string,
        value:string
    }[]
}

export interface ISet {
    name:string,
    description:string,
    reading:ISetReading[],
    listening: ISetListening[]
}

interface IResponse {
    data: ISet,
    status: string,
    message:string,
    success:boolean,
}

export const ExamApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getSingleSet : builder.query<IResponse,undefined>({
            query : () => `/exam/set/2`
        })
    })
})

export const {useGetSingleSetQuery} = ExamApi
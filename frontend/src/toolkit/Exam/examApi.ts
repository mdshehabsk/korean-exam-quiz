import baseApi from '@toolkit/utils/baseApi'
import { ISet } from '@types/exam'




interface IResponse {
    data: ISet,
    status: string,
    message:string,
    success:boolean,
}

export const examApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getSingleSet : builder.query<IResponse,undefined>({
            query : () => `/exam/set/2`
        })
    })
})

export const {useGetSingleSetQuery} = examApi
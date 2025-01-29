import baseApi from '@toolkit/utils/baseApi'
import { ISet } from '../../types/exam'




interface ISingleSetResponse {
    data: ISet
    status: string,
    message:string,
    success:boolean,
}

interface ISetResponse {
    data: ISet[],
    status: string,
    message:string,
    success:boolean,
}

export const setApi = baseApi.injectEndpoints({
    
    endpoints: builder => ({
        
        getAllSet : builder.query<ISetResponse,undefined>({
            query: () => ({
                url: '/exam/get-all-set'
            }),
            providesTags:['set']
        }),
        getSingleSet : builder.query<ISingleSetResponse,string>({
            query : (id) => `/exam/get-single-set/${id}`,
            
        }),
        createNewSet : builder.mutation({
            query : (setData) => {
                return {
                    url:'/exam/create-set',
                    body: setData,
                    method:'POST'
                }
            },
            invalidatesTags:['set']
        }),
        submitExam : builder.mutation({
            query: ({setId,submitExamData}) => ({
                url: `/exam/submit-exam/${setId}`,
                body: submitExamData,
                method: 'POST'
            })
        })
    })
})

export const {useGetSingleSetQuery,useCreateNewSetMutation,useGetAllSetQuery,useSubmitExamMutation} = setApi
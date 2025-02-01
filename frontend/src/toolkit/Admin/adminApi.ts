import baseApi from "@toolkit/utils/baseApi";
import { ISet } from "../../types/exam";

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

export const adminApi = baseApi.injectEndpoints({
    endpoints:  builder => ({
        getAllSetForAdmin : builder.query<ISetResponse,undefined>({
            query: () => ({
                url: '/admin/exam/get-all-set'
            }),
            providesTags : ['Sets']
        }),
        createNewSet : builder.mutation({
            query : (setData) => {
                return {
                    url:'/admin/exam/create-set',
                    body: setData,
                    method:'POST'
                }
            },
            invalidatesTags: ['Sets'] 
        }),
        getSingleSetForAdmin : builder.query<ISingleSetResponse,string>({
            query : (id) => `/admin/exam/get-single-set/${id}`,
            transformResponse : (response : ISingleSetResponse) => {
                const reading = response?.data?.questions?.filter(question => question.type === 'reading').map((question,i) => ({...question,number: i + 1}))
                const listeing = response?.data?.questions?.filter(question => question.type === 'listening').map((question,i) => ({...question,number: i + 21}))
                return {
                    ...response,
                    data: {
                        ...response.data,
                        questions: [...reading,...listeing]
                    }
                }
            },
            providesTags: ['Single-set']
        }),
        updateSet : builder.mutation({
            query : ({setId,status}) => ({
                url: `/admin/exam/update-set/${setId}`,
                body: {
                    status
                },
                method: 'PATCH'
            }),
            invalidatesTags: ['Sets', 'Single-set']
        })
    })
})

export const  {useGetAllSetForAdminQuery,useGetSingleSetForAdminQuery, useCreateNewSetMutation,useUpdateSetMutation} = adminApi
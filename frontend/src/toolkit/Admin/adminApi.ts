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
            })
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
            }
        }),
    })
})

export const  {useGetAllSetForAdminQuery,useGetSingleSetForAdminQuery} = adminApi
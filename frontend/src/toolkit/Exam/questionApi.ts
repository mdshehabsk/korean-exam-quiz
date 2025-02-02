import { adminApi } from "@toolkit/Admin/adminApi";
import { store } from "@toolkit/store";
import baseApi from "@toolkit/utils/baseApi";
import { ISet } from "../../types/exam";
interface ISingleSetResponse {


    data: {
      data: ISet
  
  
  status: string,
  message:string,
  success:boolean,
}
  
}
export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuestion: builder.mutation({
      query: ({ setId, formData }) => ({
        url: `/exam/add-question/${setId}`,
        method: "POST",
        body: formData,
      }),
      async onQueryStarted({setId}, {dispatch,queryFulfilled}: {dispatch: typeof store.dispatch, queryFulfilled: Promise<ISingleSetResponse>}) {
       
          const {data} = await queryFulfilled
          
          const reading = data?.data?.questions?.filter(question => question.type === 'reading').map((question,i) => ({...question,number: i + 1}))
          const listeing = data?.data?.questions?.filter(question => question.type === 'listening').map((question,i) => ({...question,number: i + 21}))
          const newResObj = {
              ...data,
              data: {
                  ...data.data,
                  questions: [...reading,...listeing]
              }
          }
          dispatch(adminApi.util.upsertQueryData('getSingleSetForAdmin', setId, newResObj))
       
      }
    }),
  }),
});

export const { useAddQuestionMutation } = questionApi;

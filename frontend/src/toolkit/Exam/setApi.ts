import baseApi from "@toolkit/utils/baseApi";
import { ISet } from "../../types/exam";

interface ISingleSetResponse {
  data: ISet;
  status: string;
  message: string;
  success: boolean;
}

interface ISetResponse {
  data: ISet[];
  status: string;
  message: string;
  success: boolean;
}

interface ISubmitResult {
  data: {
    returnSubmitedSet: ISet;
    correctAnswers: number;
    totalScore: number;
  };
  status: string;
  message: string;
  success: boolean;
}

export const setApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSet: builder.query<ISetResponse, undefined>({
      query: () => ({
        url: "/exam/get-all-set",
      }),
      providesTags: ["Sets"],
    }),

    getSingleSet: builder.query<ISingleSetResponse, string>({
      query: (id) => `/exam/get-single-set/${id}`,
      transformResponse: (response: ISingleSetResponse) => {
        const reading = response?.data?.questions
          ?.filter((question) => question.type === "reading")
          .map((question, i) => ({ ...question, number: i + 1 }));
        const listeing = response?.data?.questions
          ?.filter((question) => question.type === "listening")
          .map((question, i) => ({ ...question, number: i + 21 }));
        return {
          ...response,
          data: {
            ...response.data,
            questions: [...reading, ...listeing],
          },
        };
      },
      providesTags: ["Single-set"],
    }),

    submitExam: builder.mutation({
      query: ({ setId, submitExamData }) => ({
        url: `/exam/submit-exam/${setId}`,
        body: { submitExamData },
        method: "POST",
      }),
      transformResponse: (response: ISubmitResult) => {
        console.log(response);
        const reading = response?.data?.returnSubmitedSet?.questions
          ?.filter((question) => question.type === "reading")
          .map((question, i) => ({ ...question, number: i + 1 }));
        const listeing = response?.data?.returnSubmitedSet?.questions
          ?.filter((question) => question.type === "listening")
          .map((question, i) => ({ ...question, number: i + 21 }));
        return {
          ...response,
          data: {
            ...response.data,

            returnSubmitedSet: {
                ...response?.data?.returnSubmitedSet,
                questions: [...reading, ...listeing],
            }
          },
        };
      },
    }),
  }),
});

export const {
  useLazyGetSingleSetQuery,
  useGetSingleSetQuery,
  useGetAllSetQuery,
  useSubmitExamMutation,
} = setApi;

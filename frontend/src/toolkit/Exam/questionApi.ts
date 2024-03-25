import baseApi from "@toolkit/utils/baseApi";

export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuestion: builder.mutation({
      query: ({ setId, formData }) => ({
        url: `/exam/add-question/${setId}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useAddQuestionMutation } = questionApi;

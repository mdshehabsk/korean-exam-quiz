import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const baseApi = createApi({
    reducerPath:'api',
    tagTypes:['set'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3001/api/v1`,
    }),
    endpoints : builder => ({})
})

export default baseApi;
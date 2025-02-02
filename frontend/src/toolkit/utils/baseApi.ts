import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const baseApi = createApi({
    reducerPath:'api',
    tagTypes:['Sets' , 'Single-set'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3001/api/v1`,
    }),
    endpoints : () => ({})
})

export default baseApi;
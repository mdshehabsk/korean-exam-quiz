import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
    reducerPath:'api',
    tagTypes:['Sets' , 'Single-set'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_API_BASE_URL,
    }),
    endpoints : () => ({})
})

export default baseApi;
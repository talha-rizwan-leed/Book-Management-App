/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: ''});

// const baseQuery = async (args, api, extraOptions) => {
//     const baseResult = await fetchBaseQuery({
//         baseUrl: ""
//     })(args, api, extraOptions);

//     const statusCode = baseResult.meta?.response?.status;
//     console.log(statusCode)
//     return { ...baseResult,statusCode};
// };

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})
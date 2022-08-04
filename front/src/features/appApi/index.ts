import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginRequest {
    email: string;
    password: string;
}

interface UserAuthResult {
    token: string;
}

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1',
        prepareHeaders: (headers, { getState }) => {
            console.log('fetState', getState());
            // token ? { Authorization: 'Bearer ' + token } : {};
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // userAuth: builder.mutation<UserAuthResult, LoginRequest>({
        //     query: (params) => ({
        //         url: '/login',
        //         method: 'POST',
        //         body: params,
        //     }),
        // }),
        getFamilies: builder.query<Family[], null>({
            query: () => '/families',
        }),
        getCategories: builder.query<Category[], null>({
            query: () => '/categories',
        }),
    }),
});

export const { useGetCategoriesQuery, useGetFamiliesQuery } = appApi;

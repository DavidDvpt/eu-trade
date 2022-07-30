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
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
  endpoints: (builder) => ({
    userAuth: builder.mutation<UserAuthResult, LoginRequest>({
      query: (params) => ({ url: '/login', method: 'POST', body: params }),
    }),
    // eslint-disable-next-line no-undef
    getCategories: builder.query<Category[], string>({
      query: () => '/categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = appApi;

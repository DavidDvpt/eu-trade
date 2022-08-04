import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../app/store';

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginRequest {
    email: string;
    password: string;
}

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const auth = (getState() as RootState).auth;

            if (auth.isLogged) {
                headers.set('Authorization', 'Bearer ' + auth.token);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});

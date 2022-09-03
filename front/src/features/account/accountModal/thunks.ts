import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store';
import { AxiosPrivateInstance } from '../../../services/AxiosPrivateService';

export const fetchAuthUser = createAsyncThunk(
    'account/fetchAuthUser',
    async (data: unknown, { getState }) => {
        const state = getState() as RootState;
        const request = AxiosPrivateInstance().get<User>(
            `/users/${state.auth.userId}`,
        );
        return request.then(
            (response) => {
                return {
                    user: response.data,
                };
            },
            (err) => {
                console.log(err);
                return null;
            },
        );
    },
);

export const updateAuthUser = createAsyncThunk(
    'account/updateAuthUser',
    async (data: Partial<User>, { getState }) => {
        const state = getState() as RootState;
        const request = AxiosPrivateInstance().put<User>(
            `/users/${state.auth.userId}`,
            data,
        );

        request.then((response) => {
            console.log(response.data);
            return response.data;
        });
    },
);

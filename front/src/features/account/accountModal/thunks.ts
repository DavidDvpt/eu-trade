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

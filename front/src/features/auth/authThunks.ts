import { createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { AxiosPublicInstance } from '../../services/AxiosPublicService';
import { setLoginModal } from '../modals/modalSlice';

export const loginRequest = createAsyncThunk(
    'auth/login',
    async (params: LoginRequest, { dispatch }) => {
        const request = AxiosPublicInstance().post<{ access_token: string }>(
            '/login',
            params,
        );
        return request
            .then((response) => {
                const decode: any = jwt_decode(response.data.access_token);
                dispatch(setLoginModal(false));
                return {
                    token: response.data.access_token,
                    userId: decode.userId,
                    userPseudo: decode.userPseudo,
                };
            })
            .catch((error) => {
                console.log(error);
                throw new Error();
            });
    },
);

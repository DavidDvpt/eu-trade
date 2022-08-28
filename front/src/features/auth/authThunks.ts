import { createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { AxiosPublicInstance } from '../../services/AxiosPublicService';

export const loginRequest = createAsyncThunk(
    'auth/login',
    async (params: LoginRequest) => {
        const request = AxiosPublicInstance().post<{ access_token: string }>(
            '/login',
            params,
        );
        return request
            .then((response) => {
                const decode: any = jwt_decode(response.data.access_token);

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

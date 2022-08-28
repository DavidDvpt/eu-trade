import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { RootState } from '../../app/store';
import { AxiosPublicInstance } from '../../services/AxiosService';

const initialState: IAuthState = {
    token: null,
    isLogged: false,
    isAdmin: false,
    userId: null,
    userPseudo: null,
    loginModal: false,
};

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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.isLogged = false;
            state.isAdmin = false;
            state.userId = null;
            state.userPseudo = null;
            state.loginModal = false;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setLoginModal(state, action: PayloadAction<boolean>) {
            state.loginModal = action.payload;
        },
        resetToken(state) {
            state.token = null;
            state.isLogged = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginRequest.fulfilled, (state, action) => {
                state.isAdmin = true;
                state.isLogged = true;
                state.userId = action.payload?.userId;
                state.token = action.payload?.token ?? null;
                state.userPseudo = action.payload?.userPseudo;
                state.loginModal = false;
            })
            .addCase(loginRequest.pending, (state, action) => {
                // console.log('pending');
            })
            .addCase(loginRequest.rejected, (state, action) => {
                console.log('rejected');
            });
    },
});

export const { setToken, resetToken, setLoginModal, logout } =
    authSlice.actions;
export default authSlice.reducer;

export const getAuthState = (state: RootState) => state.auth;

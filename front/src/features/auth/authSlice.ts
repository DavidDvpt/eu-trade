import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { loginRequest } from './authThunks';

const initialState: AuthState = {
    token: null,
    isLogged: false,
    isAdmin: false,
    userId: null,
    userPseudo: null,
    loginModal: false,
};

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

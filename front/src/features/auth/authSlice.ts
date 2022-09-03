import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { loginRequest } from './authThunks';

const initialState: AuthState = {
    token: null,
    isLogged: false,
    isAdmin: false,
    userId: null,
    userPseudo: null,
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
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
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
            })
            .addCase(loginRequest.pending, (state, action) => {
                // console.log('pending');
            })
            .addCase(loginRequest.rejected, (state, action) => {
                console.log('rejected');
            });
    },
});

export const { setToken, resetToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const getAuthState = (state: RootState) => state.auth;

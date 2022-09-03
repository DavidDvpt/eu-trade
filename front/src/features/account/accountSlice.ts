import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { fetchAuthUser, updateAuthUser } from './accountModal/thunks';

const initialState: AccountState = {
    user: null,
    globalUserData: null,
};

const account = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthUser.fulfilled, (state, action) => {
                if (action.payload) {
                    const user = action.payload.user;
                    const globalData = user.datas;
                    delete user.datas;
                    state.user = user;
                    state.globalUserData = globalData ?? null;
                }
            })
            .addCase(updateAuthUser.fulfilled, (state, action) => {
                const p = action.payload;
                if (state.user && p?.pseudo && p?.email) {
                    state.user = {
                        ...state.user,
                        pseudo: p.pseudo,
                        email: p.email,
                    };
                }
            });
    },
});

// export const {} = account.actions;
export default account.reducer;

export const getAccountState = (state: RootState) => state.account;

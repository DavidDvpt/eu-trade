import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { AxiosPrivateInstance } from '../../services/AxiosPrivateService';

const initialState: AccountState = {
    user: null,
    globalUserData: null,
    accountModal: false,
};

export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async (userId: number) => {
        const request = AxiosPrivateInstance().get<AccountState>(
            `/users/${userId}`,
        );
        return request.then(
            (response) => {
                return {
                    user: response.data.user,
                    globalUserData: response.data.globalUserData,
                };
            },
            (err) => {
                console.log(err);
                return null;
            },
        );
    },
);
const account = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccountModal(state, action: PayloadAction<boolean>) {
            state.accountModal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload?.user;
                state.globalUserData = action.payload?.globalUserData;
            }
        });
    },
});

export const { setAccountModal } = account.actions;
export default account.reducer;

export const getAccountState = (state: RootState) => state.account;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosPrivateInstance } from '../../services/AxiosPrivateService';

const initialState: AccountState = {
    initialPedcardValue: 0,
};

export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async (userId: number) => {
        const request = AxiosPrivateInstance().get<AccountState>(
            `/users/${userId}`,
        );
        return request.then(
            (response) => {
                console.log(response);
                return {
                    initialPedcardValue: response.data.initialPedcardValue,
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.initialPedcardValue = action.payload?.initialPedcardValue;
            }
        });
    },
});

// export const {} = account.actions;
export default account.reducer;

// export const getAccountState = (state: RootState) => state.account;

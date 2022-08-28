import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosPrivateInstance } from '../../services/AxiosService';

const initialState: AccountState = {
    initialPedcardValue: 0,
};

export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async (userId: number) => {
        const request = AxiosPrivateInstance().get<AccountState>(
            `/user/${userId}`,
        );
        return request.then((response) => {
            return {
                initialPedcardValue: response.data.initialPedcardValue,
            };
        });
    },
);
const account = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            state.initialPedcardValue = action.payload.initialPedcardValue;
        });
    },
});

// export const {} = account.actions;
export default account.reducer;

// export const getAccountState = (state: RootState) => state.account;

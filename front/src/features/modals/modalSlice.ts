import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

const initialState: ModalsState = {
    loginModal: false,
    accountModal: false,
};
const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setLoginModal(state, action: PayloadAction<boolean>) {
            state.loginModal = action.payload;
        },
        setAccountModal(state, action: PayloadAction<boolean>) {
            state.accountModal = action.payload;
        },
    },
});

export const { setLoginModal, setAccountModal } = modalSlice.actions;
export default modalSlice.reducer;

export const getModalsState = (state: RootState) => state.modals;

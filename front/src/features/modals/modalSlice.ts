import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

interface ModalsState {
  loginModal: boolean;
}

const initialState: ModalsState = {
  loginModal: false,
};
const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setLoginModal(state, action: PayloadAction<boolean>) {
      state.loginModal = action.payload;
    },
  },
});

export const { setLoginModal } = modalSlice.actions;
export default modalSlice.reducer;

export const getModalsState = (state: RootState) => state.modals;

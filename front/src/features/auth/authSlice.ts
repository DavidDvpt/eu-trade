import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICounterState {
  isLogged: boolean;
  token: string;
}

const initialState: ICounterState = { isLogged: false, token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

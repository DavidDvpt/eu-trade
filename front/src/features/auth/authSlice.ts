import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  isLogged: boolean;
  token: string | null;
}

const initialState: IAuthState = { isLogged: false, token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    resetToken(state, action: PayloadAction<null>) {
      state.token = action.payload;
    },
    setIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
    setIsLoggedAuto(state) {
      state.isLogged = !state.isLogged;
    },
  },
});

export const { setToken, resetToken, setIsLoggedAuto } = authSlice.actions;
export default authSlice.reducer;

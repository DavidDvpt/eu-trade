import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  isLogged: boolean;
  token: string | null;
}

// interface IloginRequest {
//   email: string;
//   password: string;
// }

const initialState: IAuthState = { isLogged: false, token: null };

// const loginRequest = createAsyncThunk(
//   'user/getAuth',
//   async((params: IloginRequest) => {
//     const response = await endpoints.userAuth
//   }),
// );

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
  // extraReducers: (builder) => {
  //   builder.addCase();
  // },
});

export const { setToken, resetToken, setIsLoggedAuto } = authSlice.actions;
export default authSlice.reducer;

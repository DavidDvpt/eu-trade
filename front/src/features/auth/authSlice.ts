import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { RootState } from '../../app/store';
import { AxiosPublicInstance } from '../../services/AxiosService';

interface IAuthState {
  isLogged: boolean;
  token: string | null;
  isAdmin: boolean;
  userId: number | null;
  userPseudo: string | null;
}

const initialState: IAuthState = {
  token: null,
  isLogged: false,
  isAdmin: false,
  userId: null,
  userPseudo: null,
};

export const loginRequest = createAsyncThunk(
  'auth/login',
  async (params: LoginRequest) => {
    const request = AxiosPublicInstance().post<{ access_token: string }>(
      '/login',
      params,
    );
    return request
      .then((response) => {
        console.log(response.data);
        const decode: any = jwt_decode(response.data.access_token);

        return {
          token: response.data.access_token,
          userId: decode.userId,
          userPseudo: decode.userPseudo,
        };
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    resetToken(state) {
      state.token = null;
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.isAdmin = true;
      state.isLogged = true;
      state.userId = action.payload?.userId;
      state.token = action.payload?.token ?? null;
      state.userPseudo = action.payload?.userPseudo;
    });
  },
});

export const { setToken, resetToken } = authSlice.actions;
export default authSlice.reducer;

export const getAuthState = (state: RootState) => state.auth;

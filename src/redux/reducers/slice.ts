import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { onLogin } from './action-creators';
import { User, TypeUserState } from './types';

const initialState: TypeUserState = {
  user: null,
  isLoggedIn: false,
  token: null,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [onLogin.fulfilled.type]: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    [onLogin.pending.type]: state => {
      state.isLoading = true;
    },
    [onLogin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default userSlice.reducer;

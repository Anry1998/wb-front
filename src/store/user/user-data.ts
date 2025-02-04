import { UserState } from '@/types/state.type';
import { AuthorizationStatus, ReducerName } from '@/utils/constant';
import { createSlice } from '@reduxjs/toolkit';
import { checkUserLogin,  fetchUser, login, logout } from './api-actions';

const initialState: UserState = {
  authStatus: AuthorizationStatus.Unknown,
  hasAuthError: false,
  user: null,
  isAuthLoading: false,
  isUserLoading: false,
  hasUserError: false,
};

export const userData = createSlice({
  name: ReducerName.User,
  initialState,
  reducers: { },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthLoading = true;
        state.hasAuthError = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.isAuthLoading = false;
        state.hasAuthError = false;
      })
      .addCase(login.rejected, (state) => {
        state.authStatus = AuthorizationStatus.Unknown;
        state.isAuthLoading = false;
        state.hasAuthError = true;
      })
      .addCase(checkUserLogin.fulfilled, (state, { payload }) => {
        state.authStatus = payload
          ? AuthorizationStatus.Auth
          : AuthorizationStatus.Unknown;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
        state.hasUserError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isUserLoading = false;
        state.hasUserError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.isUserLoading = false;
      });
  },
});


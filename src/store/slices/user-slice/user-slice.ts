import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../data/authorization';
import { NameSpace } from '../../../data/const';
import { UserProcess } from '../../../data/types/state';
import { checkAuthAction, loginAction, logoutAction } from '../../api-actions';
import { UserData } from '../../../data/types/users';


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    loadUserData: (state, action: PayloadAction<{user: UserData}>) => {
      const { user } = action.payload;
      state.user = user;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

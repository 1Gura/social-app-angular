import { createReducer, on } from '@ngrx/store';
import {
  getAuthUserByAccessToken,
  getAuthUserByAccessTokenFailure,
  getAuthUserByAccessTokenSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(logout, () => initialAuthState),
  on(getAuthUserByAccessToken, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(getAuthUserByAccessTokenSuccess, (state, accessUserInfo) => ({
    ...state,
    accessUserInfo,
    loading: false
  })),
  on(getAuthUserByAccessTokenFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
);

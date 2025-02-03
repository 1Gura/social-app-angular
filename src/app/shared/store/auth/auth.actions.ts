import { createAction, props } from '@ngrx/store';
import { LoginRequest, UserInfoResponse } from '../../api/auth/auth.types';

export const login = createAction(
  '[Auth] Login',
  props<LoginRequest>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserInfoResponse; token: string }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');


export const getAuthUserByAccessToken = createAction('[Auth] Get User By Access Token');
export const getAuthUserByAccessTokenSuccess = createAction('[Auth] Get User By Access Token Success', props<{
  userId: string,
  email: string,
  username: string
}>());
export const getAuthUserByAccessTokenFailure = createAction('[Auth] Get User By Access Token Failure', props<{error: string}>());









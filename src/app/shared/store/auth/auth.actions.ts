import { createAction, props } from '@ngrx/store';
import { LoginRequest, UserInfoResponse } from '../../api/auth/auth.types';

export interface AuthErrorResponse {
  message: string,
  error: string,
  statusCode: number
}

export const login = createAction(
  '[Auth] Login',
  props<LoginRequest>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserInfoResponse; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');







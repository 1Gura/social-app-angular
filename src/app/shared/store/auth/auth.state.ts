import { UserInfoResponse } from '../../api/auth/auth.types';

export interface AuthState {
  user: UserInfoResponse | null; // TODO убрать этого user и оставить только accessUserInfo по токену
  accessUserInfo: {email: string; userId: string, username: string} | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  accessUserInfo: null,
  token: null,
  loading: false,
  error: null
};

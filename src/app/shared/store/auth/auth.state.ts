import { UserInfoResponse } from '../../api/auth/auth.types';

export interface AuthState {
  user: UserInfoResponse| null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

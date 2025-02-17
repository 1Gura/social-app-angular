import { createReducer, on } from '@ngrx/store';
import {
  loadUserById,
  loadUserByIdFailure,
  loadUserByIdSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
} from './user.actions';
import { UsersState, UserState } from './users.store';

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const initialUserState: UserState = {
  user: {
    id: '',
    age: -Infinity,
    email: '',
    password: '',
    socialMedia: undefined,
    username: '',
    subscribed: false,
  },
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(loadUsersSuccess, (state, { usersResponse }) => ({ ...state, users: usersResponse.users, loading: false })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
);

export const userReducer = createReducer(
  initialUserState,
  on(loadUserById, (state) => ({ ...state, loading: true, error: null })),
  on(loadUserByIdSuccess, (state, { userResponse }) => ({ ...state, user: userResponse, loading: false })),
  on(loadUserByIdFailure, (state, { error }) => ({ ...state, error, loading: false })),
);

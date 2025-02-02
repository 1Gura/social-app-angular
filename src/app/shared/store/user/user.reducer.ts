import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';
import { UsersState } from './users.store';

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(loadUsersSuccess, (state, { usersResponse }) => ({ ...state, users: usersResponse.users, loading: false })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

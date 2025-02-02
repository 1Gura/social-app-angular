import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.store';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);

export const selectLoading = createSelector(
  selectUsersState,
  (state: UsersState) => state.loading
);

export const selectError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);

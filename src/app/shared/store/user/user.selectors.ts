import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, UserState } from './users.store';

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

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

import { createAction, props } from '@ngrx/store';
import { User, Users } from '../../api/user/user.types';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ usersResponse: Users }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);


export const loadUserById = createAction('[User] Load User', props<{id: string}>());
export const loadUserByIdSuccess = createAction(
  '[User] Load User Success',
  props<{ userResponse: User }>()
);
export const loadUserByIdFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);

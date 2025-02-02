import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadUserById,
  loadUserByIdFailure,
  loadUserByIdSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
} from './user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../../entities/lib/api/users/users.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((usersResponse) => loadUsersSuccess({ usersResponse })),
          catchError((error) => of(loadUsersFailure({ error: error })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserById),
      switchMap(({ id }: {id: string}) =>
        this.userService.getUserById(id).pipe(
          map((userResponse) => loadUserByIdSuccess({ userResponse })),
          catchError((error) => of(loadUserByIdFailure({ error: error })))
        )
      )
    )
  );
}

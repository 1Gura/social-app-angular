import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../api/auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((payload) =>
        this.authService.login(payload).pipe(
          map((response) => loginSuccess(
            {
              user: response?.user ?? { email: '', username: '', createdAt: ''},
              token: response?.accessToken ?? '',
            }
            || {})),
          catchError((error) => of(loginFailure(error))),
        ),
      ),
    ),
  );
}

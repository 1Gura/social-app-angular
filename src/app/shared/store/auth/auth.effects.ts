import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAuthUserByAccessToken,
  getAuthUserByAccessTokenFailure,
  getAuthUserByAccessTokenSuccess,
  login,
  loginFailure,
  loginSuccess,
} from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import { AuthService } from '../../api/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((payload) =>
        this.authService.login(payload).pipe(
          map((response) => loginSuccess(
            {
              user: response?.user ?? { email: '', username: '', createdAt: '', id: ''},
              token: response?.accessToken ?? '',
            }
            || {})),
          catchError((error) => of(loginFailure(error))),
        ),
      ),
    ),
  );

  // Перенаправление после успешного входа
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['feed']))
      ),
    { dispatch: false } // Не диспатчим новое действие, просто выполняем сайд-эффект
  );

  getAuthUserByToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAuthUserByAccessToken),
      switchMap(() => this.authService.getAuthUserByAccessToken$().pipe(
        map((response) => getAuthUserByAccessTokenSuccess(response)),
        catchError((error) => of(getAuthUserByAccessTokenFailure(error))),
      ))
    ))
}

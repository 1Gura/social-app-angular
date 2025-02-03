import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service'; // Путь к вашему сервису
import { LOCAL_STORAGE_KEYS } from '../local-storage/local-storage-keys';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../api/auth/auth.service';
import { RefreshTokenResponse } from '../api/auth/auth.types';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.localStorageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    if (req.url.includes('/refresh-token')) {
      return next.handle(req);
    }

    const authReq = accessToken
      ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken$().pipe(
        switchMap((refreshTokenResponse: RefreshTokenResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.accessToken);
          this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, refreshTokenResponse.accessToken);

          const newAuthReq = req.clone({
            setHeaders: { Authorization: `Bearer ${refreshTokenResponse.accessToken}` },
          });

          return next.handle(newAuthReq);
        }),
        catchError((refreshError) => {
          this.isRefreshing = false;
          this.authService.logout({ token: '' });
          return throwError(() => refreshError);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        switchMap((token) => {
          if (token) {
            const newAuthReq = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            });
            return next.handle(newAuthReq);
          } else {
            return throwError(() => new Error('Ошибка обновления токена'));
          }
        })
      );
    }
  }
}

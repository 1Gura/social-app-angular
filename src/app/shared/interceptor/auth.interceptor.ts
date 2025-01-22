import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../storage/local-storage.service'; // Путь к вашему сервису
import { LOCAL_STORAGE_KEYS } from '../storage/local-storage-keys';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../api/auth/auth.service';
import { RefreshTokenResponse } from '../api/auth/auth.types'; // Путь к ключам локального хранилища

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.localStorageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    // Добавляем токен в заголовок Authorization, если он существует
    const authReq = accessToken
      ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Если получили 401 ошибку, пробуем обновить токен
          //  TODO При добавление этого кода блочится странциа
          // return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    return this.authService.refreshToken$().pipe(
      switchMap((refreshTokenResponse: RefreshTokenResponse) => {
        // Сохраняем новый accessToken в localStorage
        this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, refreshTokenResponse.accessToken);

        // Повторяем исходный запрос с новым токеном
        const newAuthReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${refreshTokenResponse.accessToken}`,
          },
        });

        return next.handle(newAuthReq);
      }),
      catchError((refreshError) => {
        // Если обновить токен не удалось, делаем логаут или перенаправление
        this.authService.logout({token: ''});
        return throwError(() => refreshError);
      })
    );
  }
}

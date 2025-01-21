import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../api/auth/auth.service';
import { catchError, map, Observable, take } from 'rxjs';

export const authGuard = (route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const handleRedirect = (isAuthenticated: boolean, isAuthPage: boolean): boolean | UrlTree => {
    if (isAuthenticated && isAuthPage) {
      // Авторизованный пользователь пытается попасть на страницу авторизации
      return router.createUrlTree(['/feed']);
    }

    if (!isAuthenticated && !isAuthPage) {
      // Неавторизованный пользователь пытается попасть на защищенную страницу
      return router.createUrlTree(['/auth']);
    }

    // Разрешаем доступ
    return true;
  };

  const isAuthPage = route.routeConfig?.path === 'auth'; // Проверяем, это страница авторизации?

  return authService.checkAccessToken$().pipe(
    map(isAuthenticated => handleRedirect(isAuthenticated, isAuthPage)),
    catchError(() => {
      // Обрабатываем ошибки, как если пользователь не авторизован
      return [handleRedirect(false, isAuthPage)];
    }),
    take(1)
  );
};

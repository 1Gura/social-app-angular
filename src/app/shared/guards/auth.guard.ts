import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../api/auth/auth.service';
import { map, Observable, take } from 'rxjs';

export const authGuard = (route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$().pipe(map(isAuthenticated => {
    const isAuthPage = route.routeConfig?.path === 'auth'; // Проверяем, это страница авторизации?

    if (isAuthenticated && isAuthPage) {
      // Авторизованный пользователь пытается попасть на страницу "auth"
      return router.createUrlTree(['/feed']);
    }

    if (!isAuthenticated && !isAuthPage) {
      // Неавторизованный пользователь пытается попасть на страницу, кроме "auth"
      return router.createUrlTree(['/auth']);
    }

    return true; // Разрешаем доступ
  }),take(1));
};

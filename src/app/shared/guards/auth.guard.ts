import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../api/auth/auth.service';

export const authGuard = (route: ActivatedRouteSnapshot): true | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
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
};

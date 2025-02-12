import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed', // Перенаправление на /feed
    pathMatch: 'full',  // Важно! Без этого Angular будет пытаться сопоставить любые маршруты
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/root-layout/root-layout.component').then(m => m.RootLayoutComponent),
    children: [
      { path: 'feed', loadComponent: () => import('./pages/feed/feed.component').then(m => m.FeedComponent) },
      {
        path: 'all-users',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/all-users/all-users.component').then(m => m.AllUsersComponent),
      },
      {
        path: 'create-post',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent),
      },
    ],
  },

  {
    path: 'auth',
    loadComponent: () => import('./pages/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: '', // Пустой путь для редиректа при попытке доступа к /auth
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in', loadComponent: () =>
          import('./widgets/auth/sign-in-page/sign-in-page.component').then(
            (m) => m.SignInPageComponent,
          ),
      },
      {
        path: 'sign-up', loadComponent: () =>
          import('./widgets/auth/sign-up-page/sign-up-page.component').then(
            (m) => m.SignUpPageComponent,
          ),
      },
    ],
    canActivate: [authGuard],

  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

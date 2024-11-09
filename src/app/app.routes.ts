import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home', loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    canActivate: []
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: '', // Пустой путь для редиректа при попытке доступа к /auth
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in', loadComponent: () =>
          import('./widgets/auth/sign-in-page/sign-in-page.component').then(
            (m) => m.SignInPageComponent
          ),
      },
      {
        path: 'sign-up', loadComponent: () =>
          import('./widgets/auth/sign-up-page/sign-up-page.component').then(
            (m) => m.SignUpPageComponent
          )
      },
    ]
  },
  {path: '**', redirectTo: 'auth', pathMatch: 'full'}
];

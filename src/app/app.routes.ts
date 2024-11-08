import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in', loadComponent: () =>
      import('./pages/auth/sign-in-page/sign-in-page.component').then(
        (m) => m.SignInPageComponent
      ),
  },
  {
    path: 'sign-up', loadComponent: () =>
      import('./pages/auth/sign-up-page/sign-up-page.component').then(
        (m) => m.SignUpPageComponent
      )
  },
  {
    path: 'home', loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    canActivate: []
  },
  { path: '**', redirectTo: 'sign-in' }
];

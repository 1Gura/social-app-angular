import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer, usersReducer } from './shared/store/user/user.reducer';
import { UserEffects } from './shared/store/user/user.effects';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './shared/store/auth/auth.reducer';
import { AuthEffects } from './shared/store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideStore(),
    provideState('users', usersReducer),
    provideState('user', userReducer),
    provideEffects([UserEffects]),
    provideState('auth', authReducer),
    provideEffects([AuthEffects])
  ],
};

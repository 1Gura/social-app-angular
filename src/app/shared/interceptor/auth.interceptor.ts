import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../storage/local-storage.service';

import { catchError, switchMap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from '../api/auth/auth.service';
import { LOCAL_STORAGE_KEYS } from '../storage/local-storage-keys';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly authService: AuthService)  {
  }
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              return next.handle(this.addAuthHeader(req));
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.localStorageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return req;
  }
}

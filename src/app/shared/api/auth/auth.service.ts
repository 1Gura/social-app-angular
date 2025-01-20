import { inject, Injectable } from '@angular/core';
import { ENDPOINTS } from '../endpoints';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  CheckTokenResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.types';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from '../../storage/local-storage.service';
import { LOCAL_STORAGE_KEYS } from '../../storage/local-storage-keys';
import { NotificationService } from '../../service-helper/notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = ENDPOINTS.authEndpoint; // Базовый URL для авторизации

  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly notificationService = inject(NotificationService);

  /**
   * Выполняет вход пользователя
   * @param payload { email, password }
   * @returns Observable<AuthResponse>
   */
  login(payload: LoginRequest): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, payload).pipe(tap((registerResponse) => {
      this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, registerResponse.accessToken);
    }), catchError((error: HttpErrorResponse) => {
      this.notificationService.showNotificationFromHttpCode(error.error.error, error.error.message, error.status)

      return of(null)
    }));
  }

  /**
   * Выполняет регистрацию пользователя
   * @param payload { email, password }
   * @returns Observable<AuthResponse>
   */
  register(payload: RegisterRequest): Observable<RegisterResponse | null> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, payload)
      .pipe(tap((registerResponse) => {
        this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, registerResponse.accessToken);
      }), catchError((error: HttpErrorResponse) => {
        this.notificationService.showNotificationFromHttpCode(error.error.error, error.error.message, error.status)

        return of(null)
      }));
  }

  /**
   * Выполняет выход пользователя
   * @returns Observable<void>
   */
  logout(payload: LogoutRequest): Observable<LogoutResponse> {
    // TODO тут неправильно, нужно передавать refreshToken, а не access.
    return this.http.post<LogoutResponse>(`${this.API_URL}/logout`, payload).pipe(tap(()=>{
      this.localStorageService.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      this.localStorageService.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    }));
  }

  checkToken$(): Observable<boolean> {
    return this.http.post<CheckTokenResponse>(`${this.API_URL}/checkrefreshtoken`, {}).pipe(
      map((response: CheckTokenResponse) => response.valid),
      catchError((err) => {
        console.log(err);
        this.logout({token: this.localStorageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || '' });
        return of(false);
      })
    );
  }

  isAuthenticated$(): Observable<boolean> {
    // Пример: проверяем наличие токена в LocalStorage
    return this.checkToken$()
  }
}

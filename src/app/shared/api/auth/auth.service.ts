import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../endpoints';
import { HttpClient } from '@angular/common/http';
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.types';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../storage/local-storage.service';
import { LOCAL_STORAGE_KEYS } from '../../storage/local-storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = ENDPOINTS.authEndpoint; // Базовый URL для авторизации

  constructor(private readonly http: HttpClient, private readonly localStorageService: LocalStorageService) {
  }

  /**
   * Выполняет вход пользователя
   * @param payload { email, password }
   * @returns Observable<AuthResponse>
   */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, payload).pipe(tap((registerResponse) => {
      this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, registerResponse.accessToken);
    }));
  }

  /**
   * Выполняет регистрацию пользователя
   * @param payload { email, password }
   * @returns Observable<AuthResponse>
   */
  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, payload)
      .pipe(tap((registerResponse) => {
        this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, registerResponse.accessToken);
      }));
  }

  /**
   * Выполняет выход пользователя
   * @returns Observable<void>
   */
  logout(payload: LogoutRequest): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(`${this.API_URL}/logout`, payload).pipe(tap(()=>{
      this.localStorageService.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      this.localStorageService.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    }));
  }

  refreshToken(){
    const refreshToken = this.localStorageService.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

    return this.http.post<{ accessToken: string }>(
      `${this.API_URL}/refresh`,
      { token: refreshToken }
    ).pipe(
      tap((response) => {
        this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      })
    );
  }
}

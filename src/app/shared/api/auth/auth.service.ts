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
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = ENDPOINTS.authEndpoint; // Базовый URL для авторизации

  constructor(private http: HttpClient) {}

  /**
   * Выполняет вход пользователя
   * @param payload { email, password }
   * @returns Observable<AuthResponse>
   */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, payload);
  }

  /**
   * Выполняет регистрацию пользователя
   * @param payload { email, password }
   * @returns Observable<AuthResponse>
   */
  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, payload);
  }

  /**
   * Выполняет выход пользователя
   * @returns Observable<void>
   */
  logout(payload: LogoutRequest): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(`${this.API_URL}/logout`, payload);
  }
}

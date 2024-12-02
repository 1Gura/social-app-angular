import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { CreateUserDto, User } from '../../../../shared/api/auth.types';
import { ENDPOINTS } from '../../../../shared/api/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = ENDPOINTS.usersEndpoint;

  constructor(private http: HttpClient) {
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`).pipe(catchError((err) => {
      throw new Error(err);
    }));
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${userId}`, userData).pipe(catchError((err) => {
      throw new Error(err);
    }));
  }

  createUserAccount(userData: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, userData).pipe(catchError((err) => {
      throw new Error(err);
    }));
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials).pipe(catchError((err) => {
      throw new Error(err);
    }));
  }
}

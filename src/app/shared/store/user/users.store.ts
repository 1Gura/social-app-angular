import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { UserService } from '../../../entities/lib/api/users/users.service';
import { User } from '../../api/user/user.types';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  constructor(private http: HttpClient, private readonly userService: UserService) {
    super({ users: [], loading: false, error: null });
  }

  // Селекторы
  readonly users$ = this.select((state) => state.users);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);

  // Эффект для загрузки пользователей
  readonly fetchUsers = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap(() =>
        this.userService.getUsers().pipe(
          tap({
            next: (usersResponse) => this.patchState(
              {
                users: usersResponse.users,
                loading: false
              }),
            error: (err) => this.patchState({ error: err.message, loading: false }),
          }),
          catchError(() => of([])) // Возвращаем пустой массив в случае ошибки
        )
      )
    )
  );
}

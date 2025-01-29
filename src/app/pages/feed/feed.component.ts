import { Component, OnInit } from '@angular/core';
import { UserService } from '../../entities/lib/api/users/users.service';
import { UsersStore } from '../../store/users.store';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
  ],
  providers:[UserService, UsersStore],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  users$ = this.usersStore.users$.pipe(tap(users => {
    console.log(users);
    debugger
  }));
  loading$ = this.usersStore.loading$;
  error$ = this.usersStore.error$;

  constructor(private usersStore: UsersStore) {}

  public handleFetchUsers = this.usersStore.fetchUsers;

  ngOnInit() {
    this.usersStore.fetchUsers(); // Загружаем пользователей при инициализации
  }
}

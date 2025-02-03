import { Component, OnInit } from '@angular/core';
import { UserService } from '../../entities/lib/api/users/users.service';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading, selectAuthUser } from '../../shared/store/auth/auth.selectors';
import { take } from 'rxjs';
import { UserInfoResponse } from '../../shared/api/auth/auth.types';
import { loadUserById } from '../../shared/store/user/user.actions';
import { selectUser } from '../../shared/store/user/user.selectors';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    JsonPipe,
  ],
  providers: [
    UserService,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  user$ = this.store.select(selectAuthUser);
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  userInfo$ = this.store.select(selectUser)

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers() {
    this.user$.pipe(take(1)).subscribe((user: UserInfoResponse | null) => {
        if (user) {
          this.store.dispatch(loadUserById({id: user.id}));
        }
      },
    );
  }
}

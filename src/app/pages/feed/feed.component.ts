import { Component, OnInit } from '@angular/core';
import { UserService } from '../../entities/lib/api/users/users.service';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAccessUserInfo, selectAuthError, selectAuthLoading } from '../../shared/store/auth/auth.selectors';
import { take } from 'rxjs';
import { loadUserById } from '../../shared/store/user/user.actions';
import { selectUser } from '../../shared/store/user/user.selectors';
import { getAuthUserByAccessToken } from '../../shared/store/auth/auth.actions';

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
  userByAccessToken$ = this.store.select(selectAccessUserInfo);
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  userInfo$ = this.store.select(selectUser)

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(getAuthUserByAccessToken());
  }

  fetchUser() {
    this.userByAccessToken$.pipe(take(1)).subscribe((userByAccessToken) => {
      debugger
        if (userByAccessToken) {
          this.store.dispatch(loadUserById({id: userByAccessToken.userId}));
        }
      },
    );
  }
}

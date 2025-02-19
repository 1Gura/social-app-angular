import { Component, OnInit } from '@angular/core';
import { UserService } from '../../entities/lib/api/users/users.service';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading, selectAuthUser } from '../../shared/store/auth/auth.selectors';
import { Observable, take, tap } from 'rxjs';
import { loadUserById } from '../../shared/store/user/user.actions';
import { selectUser } from '../../shared/store/user/user.selectors';
import { getAuthUserByAccessToken } from '../../shared/store/auth/auth.actions';
import { PostResponse } from '../../shared/api/user/user.types';
import { selectAllPosts, selectPostsError, selectPostsLoading } from '../../shared/store/post/post.selectors';
import { loadPosts } from '../../shared/store/post/posts.actions';

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
  userByAccessToken$ = this.store.select(selectAuthUser);
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  userInfo$ = this.store.select(selectUser);


  posts$?: Observable<PostResponse[]>;
  postsLoading$?: Observable<boolean>;
  postsError$?: Observable<string | null>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.userByAccessToken$.pipe(
      tap((userInfoResponse) => {
        if (userInfoResponse) {
          this.store.dispatch(loadPosts({
            filters: { tags: [] },
          })); // Загружаем посты
        }
      })).subscribe();

    this.store.dispatch(getAuthUserByAccessToken());

    this.posts$ = this.store.select(selectAllPosts);
    this.loading$ = this.store.select(selectPostsLoading);
    this.error$ = this.store.select(selectPostsError);


  }

  fetchUser() {
    this.userByAccessToken$.pipe(take(1)).subscribe((userByAccessToken) => {
        if (userByAccessToken) {
          this.store.dispatch(loadUserById({ id: userByAccessToken.id }));
        }
      },
    );
  }

  getPosts(): void {
    this.userByAccessToken$.pipe(take(1)).subscribe((userByAccessToken) => {
        if (userByAccessToken) {
          // const { userId } = userByAccessToken;

          this.store.dispatch(loadPosts({
            filters: { tags: [] },
          })); // Загружаем посты
        }
      },
    );
  }
}

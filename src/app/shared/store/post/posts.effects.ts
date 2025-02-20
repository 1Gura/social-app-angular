import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as PostActions from './posts.actions';
import { PostService } from '../../api/post/post.service';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {
  }

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      switchMap(({ post, files }) =>
        this.postService.createPost(post, files).pipe(
          map((newPost) => PostActions.createPostSuccess({ post: newPost })),
          catchError((error) =>
            of(PostActions.createPostFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      mergeMap(({ filters }) =>
        this.postService.getPosts(filters).pipe(
          map((listPostResponse) => PostActions.loadPostsSuccess({ posts: listPostResponse.posts })),
          catchError((error) =>
            of(PostActions.loadPostsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}

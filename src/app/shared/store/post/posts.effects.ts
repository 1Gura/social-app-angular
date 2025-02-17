import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as PostActions from './posts.actions';
import { PostService } from '../../api/post/post.service';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {
  }

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      switchMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map((newPost) => PostActions.createPostSuccess({ post: newPost })),
          catchError((error) =>
            of(PostActions.createPostFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}

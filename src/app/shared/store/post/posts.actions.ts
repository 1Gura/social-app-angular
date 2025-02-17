import { createAction, props } from '@ngrx/store';
import { CreatePostRequest, PostResponse } from '../../api/user/user.types';

// Создание поста
export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: CreatePostRequest }>(),
);

export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ post: PostResponse }>(),
);

export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ error: string }>(),
);

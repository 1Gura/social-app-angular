import { createAction, props } from '@ngrx/store';
import { CreatePostRequest, ListPostsRequest, PostResponse } from '../../api/user/user.types';
import { UploadFile } from '../../../pages/create-post/files-upload.service';

// Создание поста
export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: CreatePostRequest, files: UploadFile[] }>(),
);

export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ post: PostResponse }>(),
);

export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ error: string }>(),
);

// Запрос на загрузку постов
export const loadPosts = createAction(
  '[Posts] Load Posts',
  props<{ filters: ListPostsRequest }>(),
);

// Успешная загрузка постов
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: PostResponse[] }>(),
);

// Ошибка загрузки постов
export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>(),
);

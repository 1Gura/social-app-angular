import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './posts.reducer';

// Выбираем feature-состояние posts
const selectPostState = createFeatureSelector<PostState>('posts');

// Селектор для списка постов
export const selectPosts = createSelector(
  selectPostState,
  (state) => state.posts,
);

export const selectCreatedPost = createSelector(
  selectPostState,
  (state) => state.createdPost,
);

// Селектор для статуса загрузки
export const selectLoading = createSelector(
  selectPostState,
  (state) => state.loading,
);

// Селектор для ошибки
export const selectError = createSelector(
  selectPostState,
  (state) => state.error,
);

// Получаем список постов
export const selectAllPosts = createSelector(
  selectPostState,
  (state) => state.posts,
);

// Получаем статус загрузки
export const selectPostsLoading = createSelector(
  selectPostState,
  (state) => state.loading,
);

// Получаем ошибку
export const selectPostsError = createSelector(
  selectPostState,
  (state) => state.error,
);

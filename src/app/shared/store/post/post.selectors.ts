import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './posts.reducer';

// Выбираем feature-состояние posts
const selectPostState = createFeatureSelector<PostState>('posts');

// Селектор для списка постов
export const selectPosts = createSelector(
  selectPostState,
  (state) => state.posts,
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

import { createReducer, on } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { PostResponse } from '../../api/user/user.types';

export interface PostState {
  posts: PostResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.createPost, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostActions.createPostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
    loading: false,
  })),
  on(PostActions.createPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

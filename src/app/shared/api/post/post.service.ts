import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePostRequest, ListPostsRequest, ListPostsResponse, PostResponse } from '../user/user.types';
import { ENDPOINTS } from '../endpoints';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = ENDPOINTS.postsEndpoint; // Базовый URL для авторизации


  constructor(private http: HttpClient) {
  }

  /**
   * Получение списка постов с возможностью фильтрации по userId, тегам и локации
   */
  getPosts(filters: ListPostsRequest): Observable<ListPostsResponse> {
    return this.http.post<ListPostsResponse>(`${this.API_URL}/get-list`, filters);
  }

  /**
   * Получение поста по ID
   */
  getPostById(postId: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.API_URL}/${postId}`);
  }

  /**
   * Создание нового поста с загрузкой файлов
   */
  createPost(post: CreatePostRequest): Observable<PostResponse> {
    return this.http.post<PostResponse>(this.API_URL, post);
  }

  /**
   * Обновление поста
   */
  updatePost(postId: string, post: Partial<PostResponse>): Observable<PostResponse> {
    return this.http.put<PostResponse>(`${this.API_URL}/${postId}`, post);
  }

  /**
   * Удаление поста
   */
  deletePost(postId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${postId}`);
  }
}

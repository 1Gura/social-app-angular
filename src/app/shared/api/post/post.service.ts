import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePostRequest, File, PostResponse } from '../user/user.types';
import { ENDPOINTS } from '../endpoints';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = ENDPOINTS.authEndpoint; // Базовый URL для авторизации


  constructor(private http: HttpClient) {
  }

  /**
   * Получение списка постов с возможностью фильтрации по userId, тегам и локации
   */
  getPosts(userId?: string, tags?: string[], location?: string): Observable<PostResponse[]> {
    let params = new HttpParams();
    if (userId) params = params.set('userId', userId);
    if (tags && tags.length) params = params.set('tags', tags.join(','));
    if (location) params = params.set('location', location);

    return this.http.get<PostResponse[]>(this.API_URL, { params });
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
    const formData = new FormData();
    formData.append('caption', post.caption);
    formData.append('location', post.location ?? '');
    formData.append('altText', post.altText ?? '');

    if (post.userId) formData.append('userId', post.userId);
    if (post.tags) post.tags.forEach(tag => formData.append('tags', tag));

    if (post.files) {
      post.files.forEach((file: File) => {
        formData.append('files', file.fileData, file.filename);
      });
    }

    return this.http.post<PostResponse>(this.API_URL, formData);
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CreatePostRequest, ListPostsRequest, ListPostsResponse, PostResponse } from '../user/user.types';
import { ENDPOINTS } from '../endpoints';
import { UploadFile } from '../../../pages/create-post/files-upload.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = ENDPOINTS.postsEndpoint; // Базовый URL для авторизации
  private readonly FILES_URL = ENDPOINTS.filesEndpoint; // Базовый URL для авторизации


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
  createPost(post: CreatePostRequest, files: UploadFile[]): Observable<PostResponse> {
    let newPost: PostResponse;

    return this.http.post<PostResponse>(this.API_URL, post)
      .pipe(
        tap(createPostResponse => {
          newPost = createPostResponse;
        }),
        switchMap((postResponse) => {
          const formData = new FormData();

          files.forEach(({ file }) => {
            formData.append('files', file, file.name);
          });

          let params = new HttpParams();
          params = params.set('postId', postResponse.id);
          
          return this.http.post(`${this.FILES_URL}/upload`, formData, { params });
        }),
        map(() => {
          return newPost;
        }));


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

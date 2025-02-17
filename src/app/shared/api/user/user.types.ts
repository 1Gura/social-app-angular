export interface Empty {
}

export interface FindOneUserDto {
  id?: string | undefined;
  email?: string | undefined;
}

export interface UpdateUserDto {
  id: string;
  socialMedia: SocialMedia | undefined;
}

export interface Users {
  users: User[];
}

export interface CreateUserDto {
  username: string;
  password: string;
  age: number;
  email: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  age: number;
  subscribed: boolean;
  socialMedia: SocialMedia | undefined;
  email: string;
}

export interface SocialMedia {
  twitterUri?: string | undefined;
  fbUri?: string | undefined;
}

export interface PostResponse {
  id: string;
  caption: string;
  location?: string | undefined;
  altText?: string | undefined;
  tags: Tag[];
  files: File[];
  userId: string;
}

export interface CreatePostRequest {
  caption: string;
  location?: string | undefined;
  altText?: string | undefined;
  tags: string[];
  files: File[];
  userId: string;
}

export interface GetPostRequest {
  id: string;
}

export interface ListPostsRequest {
  userId?: string | undefined;
  tags: string[];
  location?: string | undefined;
}

export interface ListPostsResponse {
  posts: PostResponse[];
}

export interface UpdatePostRequest {
  id: string;
  caption: string;
  location?: string | undefined;
  altText?:
    | string
    | undefined;
  /** Массив тегов (необязательное поле) */
  tags: Tag[];
  files: File[];
  userId: string;
}

export interface DeletePostRequest {
  id: string;
}

/** TAGS */
export interface Tag {
  id: string;
  name: string;
}

/**
 * FILES
 * Описание файла (метаданные)
 */
export interface File {
  /** Имя файла */
  filename: string;
  /** Тип файла (например, image/jpeg) */
  mimeType: string;
  /** Бинарные данные файла (Blob) */
  fileData: Blob;
  /** Размер файла в байтах */
  fileSize: number;
}

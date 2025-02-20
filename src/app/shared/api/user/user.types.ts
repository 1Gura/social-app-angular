// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               v5.29.3
// source: user.proto

/* eslint-disable */

export const protobufUserPackage = 'user';

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
  files: FileResponse[];
  userId: string;
}

export interface CreatePostRequest {
  caption: string;
  location?: string | undefined;
  altText?: string | undefined;
  tags: string[];
  files: FileResponse[];
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
  files: FileRequest[];
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
 * Описание при создании файла (метаданные)
 */
export interface FileRequest {
  /** Имя файла */
  filename: string;
  /** Тип файла (например, image/jpeg) */
  mimeType: string;
  /** Бинарные данные файла (Blob) */
  fileData: Uint8Array;
  /** Размер файла в байтах */
  fileSize: number;
}

export interface FileResponse {
  /** Имя файла */
  filename: string;
  /** Тип файла (например, image/jpeg) */
  mimeType: string;
  /** путь к файлу */
  fileUrl: string;
  /** Размер файла в байтах */
  fileSize: number;
}


export const USERS_SERVICE_NAME = 'UsersService';

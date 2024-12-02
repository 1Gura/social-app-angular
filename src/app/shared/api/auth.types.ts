export interface Empty {
}

export interface PaginationDto {
  page: number;
  skip: number;
}

export interface FindOneUserDto {
  id: string;
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
  age?: number;
}

export interface User {
  id: string;
  username: string;
  password: string;
  age: number;
  subscribed: boolean;
  socialMedia: SocialMedia | undefined;
}

export interface SocialMedia {
  twitterUri?: string | undefined;
  fbUri?: string | undefined;
}

export const AUTH_PACKAGE_NAME = 'auth';

export const USERS_SERVICE_NAME = 'UsersService';

import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../storage/local-storage.service'; // Путь к вашему сервису
import { LOCAL_STORAGE_KEYS } from '../storage/local-storage-keys'; // Путь к ключам локального хранилища

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Получаем accessToken из локального хранилища
    const accessToken = this.localStorageService.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    // Если токен существует, добавляем его в заголовки запроса
    if (accessToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      debugger
      return next.handle(authReq); // Отправляем запрос с токеном
    }

    // Если токен отсутствует, просто отправляем запрос без изменений
    return next.handle(req);
  }
}

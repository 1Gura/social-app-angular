import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Сервис доступен во всем приложении
})
export class LocalStorageService {
  constructor() {}

  // Метод для получения значения
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Метод для сохранения значения
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Метод для удаления значения
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Метод для очистки всего хранилища
  clear(): void {
    localStorage.clear();
  }
}

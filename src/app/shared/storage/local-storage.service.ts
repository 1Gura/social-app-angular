import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Сервис доступен во всем приложении
})
export class LocalStorageService {
  constructor() {}

  get isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Метод для получения значения
  getItem(key: string): string | null {
    if(this.isLocalStorageAvailable) {
      return localStorage.getItem(key);
    }
    return null;
  }

  // Метод для сохранения значения
  setItem(key: string, value: string): void {
    if(this.isLocalStorageAvailable) {
      localStorage.setItem(key, value);
    }
  }

  // Метод для удаления значения
  removeItem(key: string): void {
    if(this.isLocalStorageAvailable) {

      localStorage.removeItem(key);
    }
  }

  // Метод для очистки всего хранилища
  clear(): void {
    if(this.isLocalStorageAvailable) {
      localStorage.clear();
    }
  }
}

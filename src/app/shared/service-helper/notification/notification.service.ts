import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationStatus = 'success' | 'error' | 'info' | 'warning';

export interface NotificationMessage {
  title: string;
  message: string;
  status: NotificationStatus;
  id?: number; // Уникальный идентификатор для удаления уведомления
  isFadingOut?: boolean; // Новое поле для управления анимацией
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject$ = new BehaviorSubject<NotificationMessage[]>([]);

  constructor() {}

  /**
   * Возвращает поток уведомлений.
   */
  get notifications$(): Observable<NotificationMessage[]> {
    return this.notificationsSubject$.asObservable();
  }

  /**
   * Добавляет новое уведомление.
   * @param title Заголовок уведомления
   * @param message Текст уведомления
   * @param status Статус уведомления (цвет/тип)
   * @param timeout Время автоудаления (в миллисекундах)
   */
  showNotification(title: string, message: string, status: NotificationStatus, timeout = 3500): void {
    const id = Date.now(); // Уникальный ID
    const notification: NotificationMessage = { id, title, message, status };
    const notifications = this.notificationsSubject$.getValue();
    this.notificationsSubject$.next([...notifications, notification]);

    // Удаление уведомления через 3.5 секунды
    setTimeout(() => this.removeNotification(id), timeout);
  }

  /**
   * Удаляет уведомление по идентификатору.
   * @param id Идентификатор уведомления
   */
  removeNotification(id: number): void {
    const notifications = this.notificationsSubject$.getValue(); // Текущие уведомления
    const notificationIndex = notifications.findIndex((n) => n.id === id);

    if (notificationIndex !== -1) {
      // Помечаем уведомление для удаления
      notifications[notificationIndex].isFadingOut = true;
      this.notificationsSubject$.next([...notifications]);

      // Удаляем уведомление после завершения анимации
      setTimeout(() => {
        const updatedNotifications = this.notificationsSubject$.getValue().filter((n) => n.id !== id);
        this.notificationsSubject$.next(updatedNotifications);
      }, 500); // 500ms — время анимации fadeOut
    }
  }


  getStatusFromHttpCode(httpCode: number): NotificationStatus {
    if (httpCode >= 200 && httpCode < 300) {
      return 'success'; // Успешные запросы
    } else if (httpCode >= 400 && httpCode < 500) {
      return 'warning'; // Ошибки клиента
    } else if (httpCode >= 500) {
      return 'error'; // Ошибки сервера
    } else {
      return 'info'; // Прочие ситуации
    }
  }

  /**
   * Добавляет уведомление на основе HTTP-кода ответа.
   * @param title Заголовок уведомления
   * @param message Текст уведомления
   * @param httpCode HTTP-код ответа
   * @param timeout Время автоудаления (в миллисекундах)
   */
  showNotificationFromHttpCode(title: string, message: string, httpCode: number, timeout: number = 3500): void {
    const status = this.getStatusFromHttpCode(httpCode);
    this.showNotification(title, message, status, timeout);
  }
}

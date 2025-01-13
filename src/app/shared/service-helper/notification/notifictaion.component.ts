import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifictaion',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './notifictaion.component.html',
  styleUrl: './notifictaion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifictaionComponent {
  public readonly notifications$ = this.notificationService.notifications$;

  constructor(private notificationService: NotificationService) {
  }

  removeNotification(id?: number): void {
    if (id) {
      this.notificationService.removeNotification(id);
    }
  }
}

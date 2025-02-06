import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonBackgroundColors } from '../base-button/button-background-colors';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';
import { Button } from 'primeng/button';
import { selectAuthError, selectAuthLoading, selectAuthUser } from '../../store/auth/auth.selectors';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    BaseButtonComponent,
    Button,
    AsyncPipe,
    AvatarModule,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  inheritButtonColor = ButtonBackgroundColors.inherit;

  user$ = this.store.select(selectAuthUser);
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  constructor(private readonly store: Store) {
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}

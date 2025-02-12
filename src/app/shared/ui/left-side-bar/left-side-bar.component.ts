import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { getAuthUserByAccessToken, logout } from '../../store/auth/auth.actions';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonBackgroundColors } from '../base-button/button-background-colors';
import { AvatarModule } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { ChangeColorDirective } from '../../directives/change-color.directive';
import { BAR_LINKS } from '../../constants/bar-links';

@Component({
  selector: 'app-left-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    AsyncPipe,
    BaseButtonComponent,
    NgIf,
    JsonPipe,
    AvatarModule,
    Button,
    RouterLinkActive,
    ChangeColorDirective,
  ],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.scss',
})
export class LeftSideBarComponent {
  user$ = this.store.select(selectAuthUser);

  readonly inheritButtonColor = ButtonBackgroundColors.inherit;

  readonly barLinks = BAR_LINKS;

  constructor(private readonly store: Store) {
    this.store.dispatch(getAuthUserByAccessToken());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}

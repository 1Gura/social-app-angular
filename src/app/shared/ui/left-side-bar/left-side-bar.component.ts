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

  readonly barLinks = [
    {
      img: '/assets/icons/home.svg',
      route: '/feed',
      label: 'Home',
    },
    {
      img: '/assets/icons/explore.svg',
      route: '/explore',
      label: 'Explore',
    },
    {
      img: '/assets/icons/people.svg',
      route: '/all-users',
      label: 'People',
    },
    {
      img: '/assets/icons/saved.svg',
      route: '/saved',
      label: 'Saved',
    },
    {
      img: '/assets/icons/reels.svg',
      route: '/saved',
      label: 'Reels',
    },
    {
      img: '/assets/icons/chats.svg',
      route: '/saved',
      label: 'Chats',
    },
    {
      img: '/assets/icons/create-post.svg',
      route: '/create-post',
      label: 'Create Post',
    },

  ];

  constructor(private readonly store: Store) {
    this.store.dispatch(getAuthUserByAccessToken());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}

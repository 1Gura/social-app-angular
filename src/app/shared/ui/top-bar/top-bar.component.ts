import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonBackgroundColors } from '../base-button/button-background-colors';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    BaseButtonComponent,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  inheritButtonColor = ButtonBackgroundColors.inherit;

}

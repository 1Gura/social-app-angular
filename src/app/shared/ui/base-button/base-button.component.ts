import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonBackgroundColors } from './button-background-colors';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-base-button',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './base-button.component.html',
  styleUrl: './base-button.component.scss',
})
export class BaseButtonComponent {
  @Input() buttonLabel = '';
  @Input() buttonColor: ButtonBackgroundColors = ButtonBackgroundColors.gradient;
  @Input() iconPath = '';
  @Input() isSubmit = false;
}

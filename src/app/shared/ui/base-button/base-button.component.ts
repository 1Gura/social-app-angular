import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonBackgroundColors } from './button-background-colors';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-base-button',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage,
    NgClass,
  ],
  templateUrl: './base-button.component.html',
  styleUrl: './base-button.component.scss',
})
export class BaseButtonComponent {
  @Input() buttonLabel = '';
  @Input() buttonColor: ButtonBackgroundColors = ButtonBackgroundColors.gradient;
  @Input() buttonBorder = true;
  @Input() iconPath = '';
  @Input() isSubmit = false;
  @Input() loading: boolean | null = null;
}

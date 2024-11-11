import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseButtonComponent } from '../../../shared/ui/base-button/base-button.component';
import { BaseInputComponent } from '../../../shared/ui/base-input/base-input.component';
import { ButtonBackgroundColors } from '../../../shared/ui/base-button/button-background-colors';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    BaseButtonComponent,
    BaseInputComponent,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  noneButtonColor = ButtonBackgroundColors.none;
}

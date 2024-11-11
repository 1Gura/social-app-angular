import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { BaseInputComponent } from '../../../shared/ui/base-input/base-input.component';
import { BaseButtonComponent } from '../../../shared/ui/base-button/base-button.component';
import { ButtonBackgroundColors } from '../../../shared/ui/base-button/button-background-colors';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, BaseInputComponent, BaseButtonComponent, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  noneButtonColor = ButtonBackgroundColors.none;
}

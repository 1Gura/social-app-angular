import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseButtonComponent } from '../../../../shared/ui/base-button/base-button.component';
import { BaseInputComponent } from '../../../../shared/ui/base-input/base-input.component';
import { ButtonBackgroundColors } from '../../../../shared/ui/base-button/button-background-colors';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SignInValidationService } from '../model/sign-in-validation.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    BaseButtonComponent,
    BaseInputComponent,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  noneButtonColor = ButtonBackgroundColors.none;
  private formBuilder = inject(FormBuilder);
  signInFormGroup = SignInValidationService.createForm(this.formBuilder);

  constructor() {
  }

  onSubmit(): void {
    if (this.signInFormGroup.invalid) {
      this.signInFormGroup.markAllAsTouched();

      return;
    }

    if (this.signInFormGroup.valid) {
      // TODO valid
    }
  }
}

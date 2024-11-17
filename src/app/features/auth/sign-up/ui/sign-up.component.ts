import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { BaseInputComponent } from '../../../../shared/ui/base-input/base-input.component';
import { BaseButtonComponent } from '../../../../shared/ui/base-button/base-button.component';
import { ButtonBackgroundColors } from '../../../../shared/ui/base-button/button-background-colors';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SignUpValidationService } from '../model/sign-up-validation.service';
import { ValidationService } from '../../../../entities/lib/user/validation/validation.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, BaseInputComponent, BaseButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  noneButtonColor = ButtonBackgroundColors.none;
  formLoading = false;
  private formBuilder = inject(FormBuilder);
  private validationService = inject(ValidationService);
  signUpFormGroup = SignUpValidationService.createForm(this.formBuilder, this.validationService);

  onSubmit(): void {
    this.formLoading = true;
    if (this.signUpFormGroup.invalid) {
      this.signUpFormGroup.markAllAsTouched();

      return;
    }

    if (this.signUpFormGroup.valid) {
      // TODO valid
    }
  }
}

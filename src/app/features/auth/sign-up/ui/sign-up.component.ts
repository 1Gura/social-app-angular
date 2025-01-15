import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { BaseInputComponent } from '../../../../shared/ui/base-input/base-input.component';
import { BaseButtonComponent } from '../../../../shared/ui/base-button/base-button.component';
import { ButtonBackgroundColors } from '../../../../shared/ui/base-button/button-background-colors';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SignUpValidationService } from '../model/sign-up-validation.service';
import { ValidationService } from '../../../../entities/lib/user/validation/validation.service';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { AuthService } from '../../../../shared/api/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, BaseInputComponent, BaseButtonComponent, RouterLink, ReactiveFormsModule, AsyncPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  noneButtonColor = ButtonBackgroundColors.none;
  formLoading$ = new BehaviorSubject<boolean>(false);
  private formBuilder = inject(FormBuilder);
  private validationService = inject(ValidationService);
  signUpFormGroup = SignUpValidationService.createForm(this.formBuilder, this.validationService);
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(Router);

  onSubmit(): void {
    this.formLoading$.next(true);
    if (this.signUpFormGroup.invalid) {
      this.signUpFormGroup.markAllAsTouched();
      this.formLoading$.next(false);

      return;
    }

    if (this.signUpFormGroup.valid) {
      this.authService.register({
        username: this.signUpFormGroup.value.name ?? '',
        password: this.signUpFormGroup.value.password ?? '',
        email: this.signUpFormGroup.value.email ?? '',
      }).pipe(finalize(() => {
        this.formLoading$.next(false);
        this.activatedRoute.navigate(['feed'])
      }), take(1)).subscribe();
    }
  }
}

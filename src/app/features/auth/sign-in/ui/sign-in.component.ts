import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseButtonComponent } from '../../../../shared/ui/base-button/base-button.component';
import { BaseInputComponent } from '../../../../shared/ui/base-input/base-input.component';
import { ButtonBackgroundColors } from '../../../../shared/ui/base-button/button-background-colors';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SignInValidationService } from '../model/sign-in-validation.service';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { AuthService } from '../../../../shared/api/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    BaseButtonComponent,
    BaseInputComponent,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  noneButtonColor = ButtonBackgroundColors.none;
  formLoading$ = new BehaviorSubject<boolean>(false);
  private formBuilder = inject(FormBuilder);
  signInFormGroup = SignInValidationService.createForm(this.formBuilder);

  private readonly authService = inject(AuthService);

  onSubmit(): void {
    this.formLoading$.next(true);
    if (this.signInFormGroup.invalid) {
      this.signInFormGroup.markAllAsTouched();
      this.formLoading$.next(false);

      return;
    }

    if (this.signInFormGroup.valid) {
      // TODO убрать username из модели
      this.authService.login({
        username: '',
        password: this.signInFormGroup.value.password ?? '',
        email: this.signInFormGroup.value.email ?? '',
      }).pipe(finalize(() => {
        this.formLoading$.next(false);
      }), take(1)).subscribe();
    }
  }
}

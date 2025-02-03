import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseButtonComponent } from '../../../../shared/ui/base-button/base-button.component';
import { BaseInputComponent } from '../../../../shared/ui/base-input/base-input.component';
import { ButtonBackgroundColors } from '../../../../shared/ui/base-button/button-background-colors';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SignInValidationService } from '../model/sign-in-validation.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../../shared/api/auth/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading, selectAuthUser } from '../../../../shared/store/auth/auth.selectors';
import { login } from '../../../../shared/store/auth/auth.actions';

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
  private readonly activatedRoute = inject(Router);

  user$ = this.store.select(selectAuthUser);
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  constructor(private store: Store) {
  }

  onSubmit(): void {
    this.formLoading$.next(true);
    if (this.signInFormGroup.invalid) {
      this.signInFormGroup.markAllAsTouched();
      this.formLoading$.next(false);

      return;
    }

    if (this.signInFormGroup.valid) {
      // TODO убрать username из модели
      this.store.dispatch(login({
            username: '',
            password: this.signInFormGroup.value.password ?? '',
            email: this.signInFormGroup.value.email ?? '',
          },
        ),
      );
    }
  }
}

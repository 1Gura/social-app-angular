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
import { UserService } from '../../../../entities/lib/api/users/users.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, BaseInputComponent, BaseButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  noneButtonColor = ButtonBackgroundColors.none;
  formLoading = false;
  private formBuilder = inject(FormBuilder);
  private validationService = inject(ValidationService);
  signUpFormGroup = SignUpValidationService.createForm(this.formBuilder, this.validationService);
  private userService = inject(UserService);


  onSubmit(): void {
    this.formLoading = true;
    if (this.signUpFormGroup.invalid) {
      this.signUpFormGroup.markAllAsTouched();
    }

    if (this.signUpFormGroup.valid) {
      debugger
      this.userService.createUserAccount({
        username: this.signUpFormGroup.value.name ?? '',
        password: this.signUpFormGroup.value.password ?? '',
      }).pipe(take(1)).subscribe(value => {
        debugger
        console.log(value);
      });
    }
  }
}

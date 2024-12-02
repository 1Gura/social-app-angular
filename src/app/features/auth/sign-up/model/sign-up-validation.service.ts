import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../entities/lib/user/validation/validation.service';

// Интерфейс для формы логина
export interface SignUpForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

export class SignUpValidationService {
  static createForm(fb: FormBuilder, validationService: ValidationService): FormGroup<SignUpForm> {
    return fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, validationService.validateEmail]],
      password: ['', [Validators.required, validationService.validateLengthPassword]],
      confirmPassword: ['', [Validators.required]],
    });
  }
}

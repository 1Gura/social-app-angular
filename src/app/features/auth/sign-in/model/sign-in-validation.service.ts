import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Интерфейс для формы логина
export interface SignInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

/**
 * Валидация для формы логина
 */
export class SignInValidationService {
  static createForm(fb: FormBuilder): FormGroup<SignInForm> {
    return fb.group<SignInForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../entities/lib/user/validation/validation.service';

export class SignUpValidationService {
  static createForm(fb: FormBuilder, validationService: ValidationService): FormGroup {
    return fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, validationService.validateEmail]],
      password: ['', [Validators.required, validationService.validateLengthPassword]],
      confirmPassword: ['', [Validators.required]],
    });
  }
}

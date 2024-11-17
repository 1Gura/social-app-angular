import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 *  Общие функции валидации
 */
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validateEmail(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  validateLengthPassword(control: AbstractControl): ValidationErrors | null {
    return control.value && control.value.length >= 8 ? null : { minLength: true };
  }
}

import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgIf } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [FormsModule, InputTextModule, NgIf, ReactiveFormsModule, PasswordModule, InputTextareaModule],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss',
})
export class BaseInputComponent {
  @Input() label = '';
  @Input() formGroup!: FormGroup;
  @Input() formInputName = '';
  @Input() errorMessage = '';
  @Input() type = 'text';
  @Input() isTextArea = false;
  @Input() placeholder = '';

  readonly uniqueId = `input-${uuidv4()}`;

  get isInvalidControl(): boolean {
    return !!this.formGroup.get(this.formInputName)?.invalid;
  }

  get isTouchedControl(): boolean {
    return !!this.formGroup.get(this.formInputName)?.touched;
  }

  onBlurEmail() {
    const inputControl = this.formGroup.get(this.formInputName);
    if (inputControl?.invalid && inputControl.touched) {
      // В этом месте можно провести дополнительные действия, если необходимо
    }
  }
}

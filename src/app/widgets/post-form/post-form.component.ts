import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseInputComponent } from '../../shared/ui/base-input/base-input.component';
import { BaseButtonComponent } from '../../shared/ui/base-button/base-button.component';
import { ButtonBackgroundColors } from '../../shared/ui/base-button/button-background-colors';
import { FileUploaderComponent } from '../../shared/ui/file-uploader/file-uploader.component';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    BaseInputComponent,
    ReactiveFormsModule,
    BaseButtonComponent,
    FileUploaderComponent,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {

  private readonly fb = inject(FormBuilder);

  public readonly formGroup = this.fb.group({
    caption: ['', Validators.required],
    mediaData: [null],
    location: [''],
    tags: [''],
    altText: [''],
  });

  public readonly noneColor = ButtonBackgroundColors.none;

  public onSubmitForm(): void {

  }
}

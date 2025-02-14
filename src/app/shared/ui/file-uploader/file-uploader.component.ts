import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { JsonPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { v4 as uuidv4 } from 'uuid';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [
    NgxFileDropModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    NgIf,
    PasswordModule,
    ReactiveFormsModule,
    BaseButtonComponent,
    NgForOf,
    JsonPipe,
    NgOptimizedImage,
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  @Input() label = '';
  @Input() errorMessage = '';
  @Input() placeholder = 'Drag and drop the files here';

  error = false;
  files: { file: File; name: string; preview: string }[] = [];

  readonly uniqueId = `input-${uuidv4()}`;

  onFilesDropped(event: NgxFileDropEntry[]) {
    for (const droppedFile of event) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.addFile(file);
        });
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => this.addFile(file));
    }
  }

  addFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.files.push({ file, name: file.name, preview: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  public fileOver(event: Event) {
    console.log(event);
  }

  public fileLeave(event: Event) {
    console.log(event);
  }
}

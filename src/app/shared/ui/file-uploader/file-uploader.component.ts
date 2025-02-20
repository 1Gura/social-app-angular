import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { v4 as uuidv4 } from 'uuid';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { FilesUploadService } from '../../../pages/create-post/files-upload.service';

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
    AsyncPipe,
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent {
  @Input() label = '';
  @Input() errorMessage = '';
  @Input() placeholder = 'Drag and drop the files here';

  fileUploadService = inject(FilesUploadService);

  readonly files$ = this.fileUploadService.filesStream$;

  error = false;

  readonly uniqueId = `input-${uuidv4()}`;

  onFilesDropped(event: NgxFileDropEntry[]) {
    for (const droppedFile of event) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.fileUploadService.addFile(file);
        });
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => this.fileUploadService.addFile(file));
    }
  }

  onRemoveFile(index: number): void {
    this.fileUploadService.removeFile(index);
  }

  public fileOver(event: Event) {
    console.log(event);
  }

  public fileLeave(event: Event) {
    console.log(event);
  }
}

import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgIf } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { v4 as uuidv4 } from 'uuid';

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
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  @Input() label = '';
  @Input() errorMessage = '';
  @Input() placeholder = 'Drag and drop the files here';

  error = false;

  readonly uniqueId = `input-${uuidv4()}`;

  onFilesDropped(files: NgxFileDropEntry[]) {
    console.log(files);
    debugger

  }
}

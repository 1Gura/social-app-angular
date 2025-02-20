import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UploadFile {
  file: File;
  name: string;
  preview: string;
}


@Injectable({
  providedIn: 'root',
})
export class FilesUploadService {
  private files$ = new BehaviorSubject<UploadFile[]>([]);

  constructor() {
  }

  get filesStream$(): Observable<UploadFile[]> {
    return this.files$.asObservable();
  }

  get filesValue(): UploadFile[] {
    return this.files$.value;
  }

  addFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const mutatedFiles = this.files$.value;
      mutatedFiles.push({ file, name: file.name, preview: reader.result as string });
      this.files$.next(mutatedFiles);
    };
    reader.readAsDataURL(file);
  }


  removeFile(index: number) {
    const mutatedFiles = this.files$.value;
    mutatedFiles.splice(index, 1);
    this.files$.next(mutatedFiles);
  }
}

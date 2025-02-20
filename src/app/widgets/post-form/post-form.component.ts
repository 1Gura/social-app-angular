import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseInputComponent } from '../../shared/ui/base-input/base-input.component';
import { BaseButtonComponent } from '../../shared/ui/base-button/base-button.component';
import { ButtonBackgroundColors } from '../../shared/ui/base-button/button-background-colors';
import { FileUploaderComponent } from '../../shared/ui/file-uploader/file-uploader.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { CreatePostRequest, PostResponse } from '../../shared/api/user/user.types';
import { Observable, take } from 'rxjs';
import { selectCreatedPost, selectError, selectLoading } from '../../shared/store/post/post.selectors';
import { selectAuthError, selectAuthLoading, selectAuthUser } from '../../shared/store/auth/auth.selectors';
import { getAuthUserByAccessToken } from '../../shared/store/auth/auth.actions';
import { FilesUploadService } from '../../pages/create-post/files-upload.service';
import { createPost } from '../../shared/store/post/posts.actions';
import { DestroyService } from '../../shared/service-helper/destroy.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    BaseInputComponent,
    ReactiveFormsModule,
    BaseButtonComponent,
    FileUploaderComponent,
    NgIf,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [DestroyService],
})
export class PostFormComponent implements OnInit {
  @Input() post?:
    { caption: string, files: unknown[], location: string, tags: string[], altText: string };

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly fileUploadService = inject(FilesUploadService);
  private readonly destroy$ = inject(DestroyService);

  public formGroup: FormGroup | null = null;

  createdPost$?: Observable<PostResponse | null>;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;

  userByAccessToken$ = this.store.select(selectAuthUser);
  userLoading$ = this.store.select(selectAuthLoading);
  userError$ = this.store.select(selectAuthError);

  public readonly noneColor = ButtonBackgroundColors.none;

  ngOnInit(): void {
    this.initCreatedPostStream();

    this.store.dispatch(getAuthUserByAccessToken());

    this.formGroup = this.fb.group({
      userId: '',
      caption: [
        this?.post?.caption ?? '',
        [
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(2),
        ],
      ],
      files: [this?.post?.files ?? null],
      location: [this?.post?.location ?? ''],
      tags: [this?.post?.tags ? this.post.tags.join(',') : ''],
      altText: [this?.post?.altText ?? ''],
    });

    this.createdPost$ = this.store.select(selectCreatedPost);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  public async onSubmitForm(): Promise<void> {
    // TODO валидацию бахнуть сюда надо
    this.userByAccessToken$.pipe(take(1)).subscribe(async (authUserInfo) => {
      if (authUserInfo && this?.formGroup?.value) {
        const tags = this.prepareTags(this.formGroup.value.tags);
        const post: CreatePostRequest = { ...this.formGroup.value, tags, userId: authUserInfo.id };

        this.store.dispatch(createPost({ post: post, files: this.fileUploadService.filesValue }));
      }
    });
  }

  private prepareTags(tagsString: string): string[] {
    return tagsString.split(',').map((tag) => tag.trim());
  }

  private initCreatedPostStream(): void {
    this.createdPost$?.pipe().subscribe(createdPost => {
      console.log(createdPost);
      debugger
    });
  }
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseInputComponent } from '../../shared/ui/base-input/base-input.component';
import { BaseButtonComponent } from '../../shared/ui/base-button/base-button.component';
import { ButtonBackgroundColors } from '../../shared/ui/base-button/button-background-colors';
import { FileUploaderComponent } from '../../shared/ui/file-uploader/file-uploader.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { CreatePostRequest, PostResponse } from '../../shared/api/user/user.types';
import { createPost } from '../../shared/store/post/posts.actions';
import { Observable } from 'rxjs';
import { selectError, selectLoading, selectPosts } from '../../shared/store/post/post.selectors';

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
})
export class PostFormComponent implements OnInit {
  @Input() post?:
    { caption: string, files: unknown[], location: string, tags: string[], altText: string };

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  public formGroup: FormGroup | null = null;

  posts$?: Observable<PostResponse[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;

  public readonly noneColor = ButtonBackgroundColors.none;

  ngOnInit(): void {
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

    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  public onSubmitForm(): void {
    if (this?.formGroup?.value) {
      const post: CreatePostRequest = this.formGroup.value;
      this.store.dispatch(createPost({ post }));
    }
  }
}

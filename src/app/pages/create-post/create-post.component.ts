import { Component } from '@angular/core';
import { PostFormComponent } from '../../widgets/post-form/post-form.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    PostFormComponent,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {

}

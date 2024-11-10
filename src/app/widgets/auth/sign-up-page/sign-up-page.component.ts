import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignUpComponent } from '../../../features/auth/sign-up/sign-up.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    SignUpComponent,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent {

}

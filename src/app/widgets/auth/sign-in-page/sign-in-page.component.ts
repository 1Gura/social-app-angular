import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInComponent } from '../../../features/auth/sign-in/ui/sign-in.component';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    SignInComponent,
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {

}

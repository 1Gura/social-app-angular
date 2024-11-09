import { Component } from '@angular/core';
import {SignInComponent} from "../../../features/auth/sign-in/sign-in.component";

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    SignInComponent
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent {

}
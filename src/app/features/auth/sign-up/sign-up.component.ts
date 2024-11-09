import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

}

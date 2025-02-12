import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BAR_LINKS } from '../../constants/bar-links';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss',
})
export class BottomBarComponent {
  barLinks = BAR_LINKS;
}

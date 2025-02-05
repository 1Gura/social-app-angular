import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../../shared/ui/top-bar/top-bar.component';
import { LeftSideBarComponent } from '../../shared/ui/left-side-bar/left-side-bar.component';
import { BottomBarComponent } from '../../shared/ui/bottom-bar/bottom-bar.component';

@Component({
  selector: 'app-root-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    TopBarComponent,
    LeftSideBarComponent,
    BottomBarComponent,
  ],
  templateUrl: './root-layout.component.html',
  styleUrl: './root-layout.component.scss'
})
export class RootLayoutComponent {

}

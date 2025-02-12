import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
  standalone: true,
  selector: '[appReplaceActiveImage]',
})
export class ChangeColorDirective implements AfterViewInit {
  @Input('appReplaceActiveImage') activeColor!: string;
  @Input() defaultColor!: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.toggleColor();
    });

    this.toggleColor();
  }

  private toggleColor(): void {
    const parent = this.el.nativeElement.closest('[routerLinkActive="active"]');

    if (parent && parent.classList.contains('active')) {
      this.renderer.setStyle(this.el.nativeElement, 'fill', this.activeColor);
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'fill', this.defaultColor);
    }
  }
}

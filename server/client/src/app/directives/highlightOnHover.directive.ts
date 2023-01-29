import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightOnHover]'
})
export class HighlightOnHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') mouseover() {
    this.renderer.addClass(this.el.nativeElement, 'bg-hover');
  }

  @HostListener('mouseleave') mouseleave() {
    this.renderer.removeClass(this.el.nativeElement, 'bg-hover');
  }
}

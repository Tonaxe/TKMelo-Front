import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    const target = this.el.nativeElement;
    target.classList.add('animate-on-scroll');

    this.observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          target.classList.add('is-visible');
          this.observer?.unobserve(target);
        }
      }),
      { threshold: 0.2 }
    );
    this.observer.observe(target);
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}

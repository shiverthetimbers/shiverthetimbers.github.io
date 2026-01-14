import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-gallery',
  imports: [NgOptimizedImage],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements AfterViewInit {
  @ViewChild('galleryContainer') galleryContainer!: ElementRef;

  ngAfterViewInit(): void {
    const container = this.galleryContainer.nativeElement as HTMLElement;
    const scrollWidth = container.scrollWidth - window.innerWidth;

    // ScrollSmoother.create({
    //   content: container,
    //   smooth: 1.3,
    //   effects: true,
    //   smoothTouch: 0.2,
    // });

    gsap.to(container, {
      x: -scrollWidth - 50,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        scrub: 2,
        // markers: true,
      },
    });
  }
}

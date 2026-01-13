import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    gsap.to(container, {
      xPercent: -560,
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

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
    const galleryEls = gsap.utils.toArray(container.children) as HTMLElement[];
    const scrollDistance = container.scrollWidth - container.clientWidth;
    const viewportCenter = () => window.innerWidth / 2;

    gsap.to(container, {
      x: () => -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 0,
        snap: { snapTo: 1 / (galleryEls.length - 1), delay: 0 },
        invalidateOnRefresh: true,
        markers: false,
        onUpdate: () => {
          galleryEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const elCenter = rect.left + rect.width / 2;

            const distance = Math.abs(viewportCenter() - elCenter);
            const maxDistance = viewportCenter();

            const opacity = gsap.utils.clamp(0, 1, 1 - Math.max(0, distance - 150) / maxDistance);

            gsap.set(el, { opacity });
          });
        },
      },
    });
  }
}

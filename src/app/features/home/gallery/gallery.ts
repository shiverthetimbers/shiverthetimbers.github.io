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
    let direction = 1;

    gsap.to(container, {
      x: () => -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 0.2,
        snap: { snapTo: 1 / (galleryEls.length - 1), delay: 0, duration: { min: 0.2, max: 0.5 } },
        invalidateOnRefresh: true,
        markers: false,
        onUpdate: (self) => {
          direction = self.direction;
          galleryEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const elCenter = rect.left + rect.width / 2;

            const distance = Math.abs(viewportCenter() - elCenter);
            const absDistance = Math.abs(distance);
            const maxDistance = viewportCenter();

            const progress = gsap.utils.clamp(0, 1, absDistance / maxDistance);
            const opacity = gsap.utils.clamp(0, 1, 1 - Math.max(0, distance - 150) / maxDistance);

            const scale = gsap.utils.interpolate(1, 0.97, progress);
            const skewY = gsap.utils.interpolate(0, direction * 2, progress);

            gsap.set(el, { opacity, skewY, scale });
          });
        },
      },
    });
  }
}

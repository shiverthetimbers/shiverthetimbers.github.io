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

    const getScrollDistance = () => {
      const frameWidth = galleryEls[0].offsetWidth;
      return frameWidth * (galleryEls.length - 1);
    };

    let scrollDistance = getScrollDistance();

    ScrollTrigger.addEventListener('refreshInit', () => {
      scrollDistance = getScrollDistance();
    });

    const updateFrames = () => {
      const deadZone = 50; // px around center with no skew
      const maxSkew = 10; // degrees at edges
      const minScaleX = 0.95; // horizontal compression at edges
      const maxDistance = window.innerWidth / 2;

      galleryEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.left + rect.width / 2;
        const distanceFromCenter = elCenter - window.innerWidth / 2;

        // --- normalized distance outside dead zone ---
        let edgeSkew = 0;
        let normalized = 0;

        if (Math.abs(distanceFromCenter) > deadZone) {
          normalized = (Math.abs(distanceFromCenter) - deadZone) / (maxDistance - deadZone);
          normalized = gsap.utils.clamp(0, 1, normalized);

          edgeSkew = normalized * maxSkew;
          if (distanceFromCenter < 0) edgeSkew = -edgeSkew;
        }

        // --- scaleX compression toward edges ---
        const scaleX = 1 - normalized * (1 - minScaleX);

        // --- transform origin pivoting at outside edge ---
        const originX = distanceFromCenter < 0 ? 'right center' : 'left center';

        // --- optional opacity / vertical scale ---
        const progress = gsap.utils.clamp(0, 1, Math.abs(distanceFromCenter) / maxDistance);
        const opacity = gsap.utils.clamp(
          0,
          1,
          1 - Math.max(0, Math.abs(distanceFromCenter) - 150) / maxDistance,
        );
        const scale = gsap.utils.interpolate(1, 0.97, progress);

        // --- apply transforms smoothly with catch-up ---
        gsap.to(el, {
          skewY: edgeSkew,
          scaleX,
          transformOrigin: originX,
          opacity,
          scale,
          duration: 0.2,
          overwrite: 'auto', // prevents stuck skew on fast scroll
          ease: 'power1.out',
        });
      });
    };

    gsap.to(container, {
      x: () => -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        markers: false,
        onUpdate: updateFrames,
      },
    });
  }
}

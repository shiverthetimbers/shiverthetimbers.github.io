import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('hero', { static: true }) hero!: ElementRef;
  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.hero.nativeElement,
          start: 'top top',
          end: '+=150%',
          scrub: 0.8,
          pin: true,
        },
      });
      // Prism 1 rotates clockwise
      tl.fromTo('.prism1', { rotateY: 45 }, { rotateY: 0, ease: 'none' })
        // Prism 2 rotates counter-clockwise
        .fromTo('.prism2', { rotateY: -45 }, { rotateY: 0, ease: 'none' }, '<');
      // prism1 face0: 210 -> 180
      tl.to('.prism1 .face0', { '--a': '180deg', ease: 'none' }, '<')

        // prism1 face3: 150 -> 90 AND fade gradient out to solid #060606
        .to('.prism1 .face3', { '--a': '90deg', ease: 'none' }, '<')
        .to('.prism1 .face3', { '--g': 0, ease: 'none' }, '<')

        // prism2 face0: 30 -> 0
        .to('.prism2 .face0', { '--a': '0deg', ease: 'none' }, '<')

        // prism2 face1: 330 -> 270 AND fade gradient out to solid #060606
        .to('.prism2 .face1', { '--a': '270deg', ease: 'none' }, '<')
        .to('.prism2 .face1', { '--g': 0, ease: 'none' }, '<');
      // ---- Final unlock + flash + fade ----
      tl.to('.prism1', { y: '-1px', ease: 'none' }, '>-0.15')
        .to('.prism2', { y: '1px', ease: 'none' }, '<')
        // Flash: pop in quickly
        .to(
          '.seam-flash',
          { opacity: 1, scaleX: 2, scaleY: 1, filter: 'blur(1px)', ease: 'none' },
          '>-0.5',
        )

        // flash phase 2: as it continues to extend, pinch height to 0 before reaching viewport edges
        .to(
          '.seam-flash',
          { scaleY: 0, opacity: 0, filter: 'blur(0px)', ease: 'power2.in' },
          '>-0.06',
        )

        // fade hero
        .to('.prism1', { y: '-80%', ease: 'none' }, '>-0.05')
        .to('.prism2', { y: '68.6%', ease: 'none' }, '<')
        .to('.scene', { opacity: 0, ease: 'none' }, '<')
        .to(['.prism1', '.prism2'], { z: 500, ease: 'none' }, '<');
    }, this.hero);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}

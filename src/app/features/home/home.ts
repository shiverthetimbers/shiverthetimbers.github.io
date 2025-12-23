import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Gallery } from './gallery/gallery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [Hero, About, Gallery],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  @ViewChild('horizontalContainer') horizontalContainer!: ElementRef;

  ngAfterViewInit(): void {
    const container = this.horizontalContainer.nativeElement as HTMLElement;
    const hScrollArray = gsap.utils.toArray(container.children) as HTMLElement[];
    const firstElem = hScrollArray[0];
    console.log(hScrollArray);

    gsap.to(hScrollArray, {
      xPercent: -100 * (hScrollArray.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${container.offsetWidth}`,
        scrub: 1,
        pin: true,
        markers: false,
      },
    });
    gsap.to(firstElem, {
      opacity: 1,
      scrollTrigger: {
        trigger: container,
        start: 'top 64%',
        end: 'top 50%',
        scrub: 1,
        markers: false,
      },
    });
  }
}

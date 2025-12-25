import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Gallery } from './gallery/gallery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience } from './experience/experience';
import { Contact } from './contact/contact';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [Hero, About, Gallery, Experience, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  @ViewChild('homeContainer') homeContainer!: ElementRef;

  ngAfterViewInit(): void {
    const container = this.homeContainer.nativeElement as HTMLElement;
    const homeEls = gsap.utils.toArray(container.children) as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 50%',
        end: 'top 25%',
        scrub: 1,
        markers: false,
      },
    });

    tl.to(homeEls[0], {
      opacity: 1,
      scrollTrigger: {
        trigger: container,
        start: 'top 50%',
        end: 'top 25%',
        scrub: 1,
        markers: false,
      },
    });
    tl.to(homeEls[2], {
      opacity: 1,
      scrollTrigger: {
        trigger: homeEls[2],
        start: 'top 50%',
        end: 'top 25%',
        scrub: 1,
        markers: false,
      },
    });
    tl.to(homeEls[3], {
      opacity: 1,
      scrollTrigger: {
        trigger: homeEls[3],
        start: 'top 50%',
        end: 'top 25%',
        scrub: 1,
        markers: false,
      },
    });
  }
}

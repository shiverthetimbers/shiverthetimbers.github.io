import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
  @ViewChild('heroContainer') heroContainer!: ElementRef;

  ngAfterViewInit(): void {
    const container = this.heroContainer.nativeElement as HTMLElement;
    const c = gsap.utils.selector(this.heroContainer.nativeElement);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=1500',
        pin: true,
        scrub: 1.2,
        markers: false,
      },
    });

    tl.to(container, {
      '--before-x': '1',
      duration: 1,
    });
    tl.to(
      container,
      {
        '--before-x': '10',
        duration: 0,
      },
      '>',
    );
    tl.to(
      c('.first-name'),
      {
        // xPercent: -92,
        paddingRight: '120%',
        // justifyContent: 'center',
        duration: 2,
      },
      '<',
    );
    tl.to(
      c('.last-name'),
      {
        paddingLeft: '120%',
        duration: 2,
      },
      '<',
    );
    tl.to(
      container,
      {
        '--before-x': '0',
        duration: 0.75,
      },
      '-=1',
    );
  }
}

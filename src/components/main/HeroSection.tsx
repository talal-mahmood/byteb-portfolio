'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Create matchMedia (no generics needed if you only read these two flags)
      const mm = gsap.matchMedia();

      mm.add(
        {
          // desktop ≥1024px, mobile <1024px
          isDesktop: '(min-width: 1024px)',
          isMobile: '(max-width: 1023px)',
          isSm: '(max-width: 500px)',
        },
        (context: gsap.Context) => {
          const { isSm, isDesktop, isMobile } = context.conditions!;

          // your intro tween
          gsap
            .timeline()
            .from('#tagline', {
              y: -100,
              opacity: 0,
              delay: 0.5,
              duration: 0.75,
            })
            .from('#tagline .part', {
              x: 1000,
              opacity: 0,
              stagger: 0.25,
            });

          // the scroll-linked timeline, with responsive start
          gsap
            .timeline({
              scrollTrigger: {
                trigger: heroRef.current,
                start: isDesktop ? 'top 0px' : 'top 72px',
                end: 'bottom -150%',
                scrub: 0.5,
                pin: true,
                // markers: true,
              },
            })
            .fromTo(
              '#tagline',
              {
                maxWidth: '196%',
                display: 'flex',
                alignItems: 'center',
                fontSize: '2.6dvw',
                fontWeight: 'bold',
              },
              {
                display: 'block',
                fontSize: isMobile ? '2.6dvw' : '1.35dvw',
                fontWeight: 'semibold',
              }
            )
            .from('#right-text', { y: 100, opacity: 0 })
            .from('#main-heading', { y: 100, opacity: 0 })
            .from('#description', { y: 50, opacity: 0 })
            .from('#button-container', { y: 30, opacity: 0 });
        }
      );

      // cleanup on unmount
      return () => mm.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id='hero-section'
      className='w-full relative bg-background text-foreground flex flex-col lg:flex-row items-center p-2 md:px-10 lg:px-0 {xl:p-20} mt-[64px] min-h-max h-[calc(100dvh-64px)] overflow-hidden gap-x-4'
    >
      <div className='relative w-full lg:max-w-1/2'>
        <h1
          id='main-heading'
          className='mb-4 font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-[#fffffe] lg:text-[4dvw]'
        >
          We Build Intuitive, Secure AI Solutions{' '}
          <br className='block {sm:hidden}' />
          for Ambitious Teams.
        </h1>
        <p
          id='tagline'
          className='mb-4 text-md sm:text-lg font-semibold bg-foreground text-background rounded-full py-1 px-2 w-max flex justify-center'
        >
          <span id='part-1' className='part text-nowrap'>
            AI.{' '}
          </span>
          <span id='part-2' className='part text-nowrap'>
            Made Ethical.{' '}
          </span>
          <span id='part-3' className='part text-nowrap'>
            Designed Beautifully.{' '}
          </span>
          <span id='part-4' className='part text-nowrap '>
            Delivered Smartly.
          </span>
        </p>
        <p
          id='description'
          className='mt-6 text-lg sm:text-xl font-light text-[#BEA6B0] lg:text-[1.39dvw]'
        >
          From chatbots to automation and on-premise models, we craft AI that
          fits your business, protects your data, and accelerates your
          growth—with ethics and experience at the core.
        </p>

        <div id='button-container' className='mt-8 gap-4'>
          <a
            href='https://calendly.com/muhammad-inam-f0mv/30min?month=2025-05'
            className='inline-flex items-center gap-2 bg-bright-yellow text-background font-medium rounded-lg px-6 py-3 hover:scale-[0.98] active:scale-[0.95] transition-transform duration-200 ease-in-out lg:text-[1.11dvw]'
          >
            Schedule a Call
          </a>
        </div>
      </div>
      <div className='w-full lg:max-w-1/2 max-lg:mt-12'>
        <h1
          id='right-text'
          ref={rightTextRef}
          className='font-semibold text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight bg-white/10 p-10 rounded-4xl lg:text-[2.08dvw]'
        >
          Our product development offers maximum value at minimum cost! We serve
          with our heart: Averaging a perfect satisfaction score as we not only
          develop, we educate. Valuing your products as our own, we save time by
          thinking ahead. Join us to bring your dreams to life!
        </h1>
      </div>
    </section>
  );
}

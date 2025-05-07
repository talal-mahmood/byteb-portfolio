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
      // First flow (tagline with continuous scroll-linked animations)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 0px',
            // Better approach: Use relative viewport units
            end: 'bottom top', // Ends when bottom of element reaches top of viewport
            scrub: 0.5, // Smoother follow-through
            pin: true,
            markers: true, // Uncomment to visualize trigger points
          },
        })

        .fromTo(
          '#tagline',
          {
            maxWidth: '196%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
          },
          { display: 'block', fontSize: '16px', fontWeight: 'semibold' }
        )
        .from('#right-text', { y: 100, opacity: 0 })
        .from('#main-heading', { y: 100, opacity: 0 })
        .from('#description', { y: 50, opacity: 0 })
        .from('#button-container', { y: 30, opacity: 0 });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className='relative bg-background text-foreground flex flex-wrap items-center p-20 mt-[64px] overflow-x-hidden'
    >
      <div className='relative max-w-1/2'>
        <h1
          id='main-heading'
          className='font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-[#fffffe]'
        >
          We Build Intuitive, Secure AI Solutions{' '}
          <br className='block sm:hidden' />
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
          className='mt-6 text-lg sm:text-xl font-light text-[#BEA6B0]'
        >
          From chatbots to automation and on-premise models, we craft AI that
          fits your business, protects your data, and accelerates your
          growth—with ethics and experience at the core.
        </p>

        <div id='button-container' className='mt-8 gap-4'>
          <a
            href='https://calendly.com/muhammad-inam-f0mv/30min?month=2025-05'
            className='inline-flex items-center gap-2 bg-bright-yellow text-background font-medium rounded-lg px-6 py-3 hover:scale-[0.98] active:scale-[0.95] transition-transform duration-200 ease-in-out'
          >
            Schedule a Call
          </a>
        </div>
      </div>
      <div className='w-full max-w-1/2'>
        <h1
          id='right-text'
          ref={rightTextRef}
          className='font-semibold text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight bg-white/10 p-10 rounded-4xl'
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

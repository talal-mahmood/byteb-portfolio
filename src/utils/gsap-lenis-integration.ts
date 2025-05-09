import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

export function integrateGsapWithLenis(lenis: Lenis | null) {
  if (!lenis) return;

  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Update ScrollTrigger when Lenis scrolls
  lenis.on('scroll', ScrollTrigger.update);

  // Add a ticker to GSAP that will update Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Add a listener to update ScrollTrigger when window resizes
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}

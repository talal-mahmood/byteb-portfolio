'use client';

import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

function SmoothScroll({ children }: any) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      // options={{
      //   autoRaf: false,
      //   duration: 0.1,
      //   lerp: 0.1,
      //   // easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), // Custom ease
      //   orientation: 'vertical',
      //   gestureOrientation: 'vertical',
      //   smoothWheel: true,
      //   touchMultiplier: 1,
      // }}
      options={{
        autoRaf: false,
        duration: 2,
        smoothWheel: true,
        touchMultiplier: 2,
        wheelMultiplier: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        syncTouch: true,
      }}
      ref={lenisRef}
      root
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;

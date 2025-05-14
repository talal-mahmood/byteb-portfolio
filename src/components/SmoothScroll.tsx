'use client';

import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      if (lenisRef.current?.lenis) {
        // Temporarily disable smooth scrolling
        lenisRef.current.lenis.stop();

        // Scroll to top instantly using native scroll
        window.scrollTo(0, 0);

        // Wait for next tick to ensure scroll is complete
        requestAnimationFrame(() => {
          // Mark initialization as complete
          setIsInitialized(true);

          // Re-enable smooth scrolling
          setTimeout(() => {
            lenisRef.current.lenis.start();
          }, 100);
        });
      }
    };

    // Run initialization
    handleLoad();
    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      {!isInitialized ? (
        <body className='fixed inset-0 z-50 flex items-center justify-center bg-background'>
          <div
            className={`loader animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-primary h-12 w-12 transition-opacity duration-300 ${
              isInitialized ? 'opacity-0' : 'opacity-100'
            }`}
          ></div>
        </body>
      ) : null}
      <ReactLenis
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
        {isInitialized && children}
      </ReactLenis>
    </>
  );
}

export default SmoothScroll;

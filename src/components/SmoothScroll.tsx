'use client';

import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      const checkLenis = () => {
        const lenis = lenisRef.current?.lenis;
        if (lenis) {
          if (window.location.hash) {
            history.replaceState(
              null,
              '',
              window.location.pathname + window.location.search
            );
          }

          lenis.stop();
          window.scrollTo(0, 0);
          requestAnimationFrame(() => {
            setIsInitialized(true);
            setTimeout(() => lenis.start(), 100);
          });
        } else {
          // Retry after short delay
          setTimeout(() => {
            setIsInitialized(true); // Proceed anyway
          }, 200); // Adjust timing if needed
        }
      };

      checkLenis();
    };

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

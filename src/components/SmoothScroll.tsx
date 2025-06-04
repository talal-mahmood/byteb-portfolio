'use client';

import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device using media query
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(isMobileDevice);

    if (isMobileDevice) {
      setIsInitialized(true);
      return;
    }

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
          setTimeout(() => {
            setIsInitialized(true);
          }, 200);
        }
      };

      checkLenis();
    };

    handleLoad();
    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      function update(time: any) {
        lenisRef.current?.lenis?.raf(time * 1000);
      }

      gsap.ticker.add(update);
      return () => gsap.ticker.remove(update);
    }
  }, [isMobile]);

  if (!isInitialized) {
    return (
      <body className='fixed inset-0 z-50 flex items-center justify-center bg-background'>
        <div className='loader animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-primary h-12 w-12 transition-opacity duration-300'></div>
      </body>
    );
  }

  if (isMobile) {
    return <>{children}</>; // No smooth scroll on mobile
  }

  return (
    <ReactLenis
      options={{
        autoRaf: false,
        duration: 2,
        smoothWheel: true,
        touchMultiplier: 2,
        // touchMultiplier: 0,
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

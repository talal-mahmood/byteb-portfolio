'use client';

import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import { Children, useEffect, useRef } from 'react';

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
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef} root>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;

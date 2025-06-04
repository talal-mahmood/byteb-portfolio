import { useState, useEffect } from 'react';

export const isMobileScreen = () => {
  if (typeof window === 'undefined') return false; // Default to false for SSR
  return window.innerWidth < 1024; // 1024px is our breakpoint for mobile
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(isMobileScreen());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileScreen());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

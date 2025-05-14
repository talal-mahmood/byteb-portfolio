// context/ScrollContext.tsx
'use client';

import { createContext, useContext } from 'react';

const ScrollContext = createContext({
  isInitialized: false,
});

export const useScroll = () => useContext(ScrollContext);

export function ScrollProvider({
  children,
  isInitialized,
}: {
  children: React.ReactNode;
  isInitialized: boolean;
}) {
  return (
    <ScrollContext.Provider value={{ isInitialized }}>
      {children}
    </ScrollContext.Provider>
  );
}

'use client';

import type React from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import Link from 'next/link';
import { PanelBottomClose, PanelTopClose, X } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

interface HeaderProps {
  isHomepage: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHomepage }) => {
  const lenis = useLenis();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ensure the drawer is hidden/offscreen on first render
  useLayoutEffect(() => {
    const el = drawerRef.current;
    if (el) {
      gsap.set(el, {
        y: '-100%',
        autoAlpha: 0,
        display: 'none',
      });
    }
  }, []);

  function openDrawer() {
    if (!drawerRef.current) return;

    gsap.set(drawerRef.current, { y: '-100%', autoAlpha: 1, display: 'block' });
    gsap.to(drawerRef.current, {
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    });

    setDrawerOpen(true);
  }

  function closeDrawer() {
    if (!drawerRef.current) return;

    gsap.to(drawerRef.current, {
      y: '-100%',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(drawerRef.current, { autoAlpha: 0, display: 'none' });
      },
    });

    setDrawerOpen(false);
  }

  function handleClick(e: React.MouseEvent, hash: string) {
    e.preventDefault();

    // Get the target element
    const targetElement = document.querySelector(hash);

    if (targetElement) {
      // Fixed header offset
      const headerOffset = 72;

      // Use GSAP to create a smoother animation effect
      gsap.to(window, {
        duration: 1.2, // Longer duration for smoother effect
        scrollTo: {
          y: targetElement,
          offsetY: headerOffset,
          autoKill: false,
        },
        ease: 'power3.out', // Smoother easing function
        onStart: () => {
          // Disable Lenis temporarily during GSAP animation
          lenis?.stop();
        },
        onComplete: () => {
          // Update URL hash without triggering a scroll
          window.history.pushState(null, '', hash);
          // Re-enable Lenis after animation completes
          lenis?.start();
        },
      });
    }
  }

  return (
    <>
      <div
        ref={drawerRef}
        className='fixed bottom-0 left-0 right-0 h-[calc(100%-64px)] bg-background z-50 block xl:hidden'
        style={{ display: 'none' }}
      >
        {/* <X
          className='w-[12dvh] h-[12dvh] cursor-pointer'
          onClick={closeDrawer}
        /> */}
        <div className='w-full h-full flex flex-col items-center justify-center gap-[5dvh] text-[4dvw]'>
          {[
            ['Self Learning tool', '#self-learning-tool'],
            ['Legal Analysis Agent', '#legal-analysis-agent'],
            ['Agent builder', '#agent-builder'],
            ['Lead Intelligence', '#lead-intelligence'],
            ['Smart PLAB assistant', '#smart-plab-assistant'],
          ].map(([label, hash]) => (
            <Link
              key={hash}
              href={hash}
              onClick={(e) => {
                handleClick(e, hash);
                closeDrawer();
              }}
              className='px-5 py-3 {rounded-full} {hover:bg-white/90} hover:text-white/80'
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between gap-4 {bg-transparent} w-full h-[72px] py-1 px-2 md:px-10 xl:px-20  fixed top-0 left-0 right-0 z-10 bg-background'>
        {/* {showModal && (
        <Modal
          title='Logout'
          description='Are you sure you want to logout?'
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            localStorage.removeItem('token');
            setShowModal(false);
            navigate('/login');
          }}
        />
      )} */}
        {/* <Link
        // href='https://byteb.io/'
        href='/'
        className='p-4 {backdrop-blur-md} {bg-white/15} rounded-4xl h-max'
      >
        <BytebricksLogo />
      </Link> */}
        <Image
          width={1000}
          height={1000}
          src='/logo.png'
          alt='bytebricks'
          className='h-full w-min'
        />
        <nav className='rounded-full max-w-full h-full w-max p-1 flex items-center justify-between {backdrop-blur-md} {bg-white/15}'>
          {drawerOpen ? (
            <button className='xl:hidden cursor-pointer' onClick={closeDrawer}>
              <PanelTopClose className='w-[3dvw] h-[3dvw]' />
            </button>
          ) : (
            <button className='xl:hidden cursor-pointer' onClick={openDrawer}>
              <PanelBottomClose className='w-[3dvw] h-[3dvw]' />
            </button>
          )}
          <div className='flex items-center gap-2 max-xl:hidden'>
            {/* <h1 className='text-xl'>Contents</h1> */}
            {[
              ['Self Learning tool', '#self-learning-tool'],
              ['Legal Analysis Agent', '#legal-analysis-agent'],
              ['Agent builder', '#agent-builder'],
              ['Lead Intelligence', '#lead-intelligence'],
              ['Smart PLAB assistant', '#smart-plab-assistant'],
            ].map(([label, hash]) => (
              <Link
                key={hash}
                href={hash}
                onClick={(e) => handleClick(e, hash)}
                className='px-5 py-3 {rounded-full} {hover:bg-white/90} font-semibold hover:text-white/80'
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
        {/* CTA Button */}
        <div className='flex items-center justify-center p-1 rounded-full {backdrop-blur-md} {bg-white/15}'>
          <a
            href='https://calendly.com/muhammad-inam-f0mv/30min'
            className='bg-foreground text-background px-5 py-3 mx-1 my-1 font-bold rounded-full hover:bg-white/90 text-nowrap'
            target='_blank'
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;

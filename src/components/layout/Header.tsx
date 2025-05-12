'use client';

import type React from 'react';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ExternalLink } from 'lucide-react';
import { useGSAP } from '@gsap/react';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollTrigger);

// Navigation items
const NAV_ITEMS = [
  // { label: '', hash: '#hero-section' },
  { label: 'Self Learning Tool', hash: '#self-learning-tool' },
  { label: 'Legal Analysis Agent', hash: '#legal-analysis-agent' },
  { label: 'Agent Builder', hash: '#agent-builder' },
  { label: 'Lead Intelligence', hash: '#lead-intelligence' },
  { label: 'Smart PLAB Assistant', hash: '#smart-plab-assistant' },
];

const Header = () => {
  const lenis = useLenis();
  const drawerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const mobileNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sections = useRef<HTMLElement[]>([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [isInitialized, setIsInitialized] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  // // Initialize drawer position
  // useEffect(() => {
  //   if (drawerRef.current) {
  //     gsap.set(drawerRef.current, {
  //       x: '100%',
  //       autoAlpha: 0,
  //       display: 'none',
  //     });
  //   }

  //   setIsInitialized(true);
  // }, []);

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      if (!navRef.current || !underlineRef.current) return;

      // Collect section elements
      sections.current = NAV_ITEMS.map(
        ({ hash }) => document.querySelector(hash) as HTMLElement
      ).filter(Boolean);

      const links = Array.from(
        navRef.current.querySelectorAll('a')
      ) as HTMLElement[];

      // Mobile: update activeHash on scroll
      sections.current.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'bottom top',
          end: 'top bottom',
          onEnter: () => setActiveHash(NAV_ITEMS[i + 1].hash),
          onEnterBack: () => setActiveHash(NAV_ITEMS[i].hash),
        });
      });

      // Desktop: underline animation
      const moveUnderline = (el: HTMLElement) => {
        gsap.to(underlineRef.current, {
          x: el.offsetLeft,
          width: el.offsetWidth,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      // Initial underline
      if (links[0]) {
        gsap.set(underlineRef.current, {
          x: links[0].offsetLeft,
          width: links[0].offsetWidth,
        });
      }

      ScrollTrigger.batch(sections.current, {
        onEnter: (batch) => {
          const index = sections.current.indexOf(batch[0] as HTMLElement);
          moveUnderline(links[index]);
        },
        onEnterBack: (batch) => {
          const index = sections.current.indexOf(batch[0] as HTMLElement);
          moveUnderline(links[index]);
        },
        start: 'bottom top+=100%',
        end: 'top 100%',
        once: false,
      });
    },
    { scope: headerRef }
  );

  // Handle drawer open/close
  function toggleDrawer() {
    if (!drawerRef.current) return;

    if (!drawerOpen) {
      // Open drawer
      gsap.set(drawerRef.current, { x: '100%', autoAlpha: 1, display: 'flex' });
      gsap.to(drawerRef.current, {
        x: '0%',
        duration: 0.4,
        ease: 'power3.out',
      });
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Close drawer
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(drawerRef.current, { autoAlpha: 0, display: 'none' });
        },
      });
      // Restore body scrolling
      document.body.style.overflow = '';
    }

    setDrawerOpen(!drawerOpen);
  }

  // Smooth scroll to section using Lenis
  function handleClick(e: React.MouseEvent, hash: string) {
    e.preventDefault();
    const target = document.querySelector(hash);
    if (!target) return;

    // Calculate final scroll position (minus your header height)
    const headerOffset = 80;
    const top =
      (target as HTMLElement).getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    // Let Lenis do the smooth scrolling
    lenis?.scrollTo(top, {
      duration: 1,
      easing: (t) => t, // linear timing; tweak to taste
    });

    // Update URL & close drawer immediately
    window.history.pushState(null, '', hash);
    if (drawerOpen) toggleDrawer();
  }

  return (
    <>
      {/* Mobile Navigation Drawer */}
      <div
        ref={drawerRef}
        className='fixed top-0 right-0 bottom-0 w-[80%] max-w-[400px] bg-background/95 backdrop-blur-md z-50 flex flex-col shadow-2xl'
        style={{ display: 'none' }}
      >
        <div className='flex justify-between items-center p-6 border-b border-border/20'>
          <Image
            width={120}
            height={40}
            src='/logo-text.png'
            alt='bytebricks'
            className='h-10 w-auto'
          />
          <button
            onClick={toggleDrawer}
            className='p-2 rounded-full hover:bg-foreground/10 transition-colors'
            aria-label='Close menu'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='flex-1 overflow-auto py-6'>
          <nav className='flex flex-col space-y-1 px-4'>
            {NAV_ITEMS.map(({ label, hash }, index) => (
              <Link
                key={hash}
                href={hash}
                ref={(el) => {
                  mobileNavRefs.current[index] = el;
                }}
                onClick={(e) => handleClick(e, hash)}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  activeHash === hash
                    ? 'bg-foreground/10 font-medium'
                    : 'hover:bg-foreground/5'
                }`}
              >
                <span>{label}</span>
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeHash === hash ? 'bg-bright-yellow' : 'bg-transparent'
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className='p-6 border-t border-border/20'>
          <a
            href='https://calendly.com/muhammad-inam-f0mv/30min'
            className='flex items-center justify-center gap-2 w-full bg-foreground text-background py-3 px-6 rounded-lg font-medium hover:bg-foreground/90 transition-colors'
            target='_blank'
            rel='noopener noreferrer'
          >
            Let&apos;s Talk
            <ExternalLink className='w-4 h-4' />
          </a>
        </div>
      </div>

      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md shadow-md py-3'
            : 'bg-background py-4'
        }`}
      >
        <div className='px-2 sm:px-4 lg:px-12 flex items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <Image
              width={140}
              height={40}
              src='/logo-text.png'
              alt='bytebricks'
              className='h-8 sm:h-10 w-auto lg:h-auto lg:w-[14.27dvw]'
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className='relative hidden lg:flex items-center space-x-1'
            ref={navRef}
          >
            <div className='flex space-x-1'>
              {NAV_ITEMS.map(({ label, hash }) => (
                <Link
                  key={hash}
                  href={hash}
                  onClick={(e) => handleClick(e, hash)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white/80 lg:text-[1.04dvw]`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* ✅ Underline element */}
            <span
              ref={underlineRef}
              className='absolute bottom-0 left-0 h-0.5 bg-bright-yellow hidden lg:block transition-all duration-300'
            />
          </nav>

          {/* CTA Button and Mobile Menu */}
          <div className='flex items-center sm:space-x-4'>
            <a
              href='https://calendly.com/muhammad-inam-f0mv/30min'
              className='bg-foreground text-background px-5 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap'
              target='_blank'
              rel='noopener noreferrer'
            >
              Let&apos;s Talk
            </a>

            <button
              onClick={toggleDrawer}
              className='lg:hidden p-2 rounded-lg hover:bg-foreground/10 transition-colors'
              aria-label='Open menu'
            >
              <Menu className='w-6 h-6' />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay for mobile drawer */}
      {drawerOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm'
          onClick={toggleDrawer}
        />
      )}
    </>
  );
};

export default Header;
